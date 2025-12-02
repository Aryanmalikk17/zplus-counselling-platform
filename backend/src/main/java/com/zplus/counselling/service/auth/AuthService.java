package com.zplus.counselling.service.auth;

import com.zplus.counselling.dto.request.LoginRequest;
import com.zplus.counselling.dto.request.RegisterRequest;
import com.zplus.counselling.dto.response.AuthResponse;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        String jwt = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);

        // Update last login
        User user = userService.findByEmail(loginRequest.getEmail());
        user.setLastLoginAt(LocalDateTime.now());
        userService.save(user);

        return AuthResponse.builder()
            .accessToken(jwt)
            .refreshToken(refreshToken)
            .tokenType("Bearer")
            .user(user)
            .build();
    }

    @Transactional
    public AuthResponse register(RegisterRequest registerRequest) {
        if (userService.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFullName(registerRequest.getFullName());
        user.setPhone(registerRequest.getPhone());

        User savedUser = userService.save(user);

        // Auto login after registration
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                registerRequest.getEmail(),
                registerRequest.getPassword()
            )
        );

        String jwt = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);

        return AuthResponse.builder()
            .accessToken(jwt)
            .refreshToken(refreshToken)
            .tokenType("Bearer")
            .user(savedUser)
            .build();
    }

    @Transactional
    public AuthResponse refreshToken(String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String email = tokenProvider.getUsernameFromToken(refreshToken);
        User user = userService.findByEmail(email);

        Authentication authentication = new UsernamePasswordAuthenticationToken(
            user.getEmail(), null, user.getAuthorities()
        );

        String newAccessToken = tokenProvider.generateToken(authentication);
        String newRefreshToken = tokenProvider.generateRefreshToken(authentication);

        return AuthResponse.builder()
            .accessToken(newAccessToken)
            .refreshToken(newRefreshToken)
            .tokenType("Bearer")
            .user(user)
            .build();
    }

    @Transactional
    public void logout(UUID userId) {
        // In a stateless JWT system, logout is typically handled client-side
        // But we can add server-side token blacklisting if needed
        User user = userService.findById(userId);
        user.setLastLogoutAt(LocalDateTime.now());
        userService.save(user);
    }

    @Transactional
    public void changePassword(UUID userId, String currentPassword, String newPassword) {
        User user = userService.findById(userId);
        
        if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setPasswordChangedAt(LocalDateTime.now());
        userService.save(user);
    }

    @Transactional
    public void forgotPassword(String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            // Don't reveal whether email exists for security
            return;
        }

        // Generate password reset token
        String resetToken = tokenProvider.generatePasswordResetToken(email);
        user.setPasswordResetToken(resetToken);
        user.setPasswordResetTokenExpiresAt(LocalDateTime.now().plusHours(1));
        userService.save(user);

        
        // emailService.sendPasswordResetEmail(user.getEmail(), resetToken);
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        if (!tokenProvider.validatePasswordResetToken(token)) {
            throw new RuntimeException("Invalid or expired reset token");
        }

        String email = tokenProvider.getEmailFromPasswordResetToken(token);
        User user = userService.findByEmail(email);

        if (user.getPasswordResetTokenExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Reset token has expired");
        }

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setPasswordResetToken(null);
        user.setPasswordResetTokenExpiresAt(null);
        user.setPasswordChangedAt(LocalDateTime.now());
        userService.save(user);
    }
}