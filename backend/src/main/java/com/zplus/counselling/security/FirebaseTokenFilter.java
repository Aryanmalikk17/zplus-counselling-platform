package com.zplus.counselling.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.repository.postgres.UserRepository;
import com.zplus.counselling.security.UserPrincipal;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FirebaseTokenFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            try {
                // Verify Token with Firebase
                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                String uid = decodedToken.getUid();
                String email = decodedToken.getEmail();
                String name = decodedToken.getName();
                String picture = decodedToken.getPicture();

                // Check if user exists in DB
                User user = userRepository.findByFirebaseUid(uid)
                        .orElseGet(() -> userRepository.findByEmail(email)
                                .map(existingUser -> {
                                    // Link existing user to Firebase
                                    existingUser.setFirebaseUid(uid);
                                    existingUser.setProvider("GOOGLE"); // Assuming Google on first link or generic
                                    if (picture != null) existingUser.setProfilePictureUrl(picture);
                                    return userRepository.save(existingUser);
                                })
                                .orElseGet(() -> {
                                    // Create new user
                                    User newUser = new User();
                                    newUser.setFirebaseUid(uid);
                                    newUser.setEmail(email);
                                    newUser.setFullName(name != null ? name : "User");
                                    newUser.setProfilePictureUrl(picture);
                                    newUser.setProvider("GOOGLE");
                                    newUser.setIsEmailVerified(decodedToken.isEmailVerified());
                                    // Set default values
                                    newUser.setCreatedAt(java.time.LocalDateTime.now());
                                    newUser.setUpdatedAt(java.time.LocalDateTime.now());
                                    return userRepository.save(newUser);
                                }));

                UserDetails userDetails = UserPrincipal.create(user);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Set Authentication in Context
                SecurityContextHolder.getContext().setAuthentication(authentication);
                
                // Add useful attributes to request
                request.setAttribute("userId", user.getId());
                request.setAttribute("X-Firebase-Uid", uid);
                request.setAttribute("X-Firebase-Email", email);

            } catch (FirebaseAuthException e) {
                System.err.println("Firebase token verification failed: " + e.getMessage());
            } catch (Exception e) {
                 System.err.println("Authentication error: " + e.getMessage());
                 e.printStackTrace();
            }
        }

        filterChain.doFilter(request, response);
    }
}
