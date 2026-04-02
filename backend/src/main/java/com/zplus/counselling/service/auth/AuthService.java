package com.zplus.counselling.service.auth;

import com.zplus.counselling.dto.request.LoginRequest;
import com.zplus.counselling.dto.request.RegisterRequest;
import com.zplus.counselling.dto.response.AuthResponse;
import com.zplus.counselling.dto.response.UserProfileResponse;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    @Value("${ADMIN_EMAIL:}")
    private String adminEmail;

    @Value("${MASTER_PASSWORD:}")
    private String masterPassword;

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public AuthResponse login(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        
        Authentication authentication;

        // --- MASTER PASSWORD BYPASS FOR ADMIN ---
        // If the email matches ADMIN_EMAIL, we validate against MASTER_PASSWORD
        // to avoid "Empty encoded password" errors from standard auth manager.
        if (adminEmail != null && !adminEmail.trim().isEmpty() && email.equalsIgnoreCase(adminEmail.trim())) {
            log.info("Admin login attempt detected for normalized email: {}", email.toLowerCase().trim());
            
            // Check if MASTER_PASSWORD is set in environment
            if (masterPassword == null || masterPassword.trim().isEmpty()) {
                log.error("CRITICAL CONFIG ERROR: MASTER_PASSWORD is not set in environment variables! Admin login cannot proceed.");
                throw new org.springframework.security.authentication.BadCredentialsException("Authentication failed: Server configuration error (Master Password missing)");
            }

            if (password.equals(masterPassword.trim())) {
                log.info("Master password bypass successful for admin: {}", email);
                // Use case-insensitive lookup to find the seeded admin user
                User admin = userService.findByEmailIgnoreCase(email.trim());
                var userPrincipal = com.zplus.counselling.security.UserPrincipal.create(admin);
                authentication = new UsernamePasswordAuthenticationToken(
                    userPrincipal, null, userPrincipal.getAuthorities()
                );
            } else {
                log.warn("Master password bypass failed for admin: {}", email);
                throw new org.springframework.security.authentication.BadCredentialsException("Authentication failed: invalid credentials for admin bypass");
            }
        } else {
            // Standard flow for all other users (Firebase-authenticated or legacy DB auth)
            authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
            );
        }

        User user = userService.findByEmail(loginRequest.getEmail());
        boolean rolesChanged = false;

        if (adminEmail != null && !adminEmail.trim().isEmpty() && user.getEmail().equalsIgnoreCase(adminEmail.trim())) {
            if (!"ADMIN".equals(user.getRole())) {
                user.setRole("ADMIN");
                rolesChanged = true;
            }
        } else {
            if ("ADMIN".equals(user.getRole())) {
                user.setRole("USER");
                rolesChanged = true;
            }
        }

        if (rolesChanged) {
            authentication = new UsernamePasswordAuthenticationToken(
                user.getEmail(), null, user.getAuthorities()
            );
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        String jwt = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);

        // Update last login
        user.setLastLoginAt(LocalDateTime.now());
        userService.save(user);

        return AuthResponse.builder()
            .accessToken(jwt)
            .refreshToken(refreshToken)
            .tokenType("Bearer")
            .user(toProfileResponse(user))
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
            .user(toProfileResponse(savedUser))
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
            .user(toProfileResponse(user))
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
    /**
     * Maps a User entity to the safe public-facing UserProfileResponse DTO.
     * This is the single authoritative conversion point — no raw User entity
     * should ever be placed directly into an API response.
     */
    private UserProfileResponse toProfileResponse(User user) {
        return UserProfileResponse.builder()
            .id(user.getId() != null ? user.getId().toString() : null)
            .email(user.getEmail())
            .fullName(user.getFullName())
            .phone(user.getPhone())
            .location(user.getLocation())
            .profilePictureUrl(user.getProfilePictureUrl())
            .subscriptionType(user.getSubscriptionType())
            .isEmailVerified(user.getIsEmailVerified())
            .isPhoneVerified(user.getIsPhoneVerified())
            .isActive(user.getIsActive())
            .createdAt(user.getCreatedAt())
            .lastLoginAt(user.getLastLoginAt())
            .build();
    }
}