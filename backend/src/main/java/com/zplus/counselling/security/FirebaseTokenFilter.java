package com.zplus.counselling.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.repository.postgres.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class FirebaseTokenFilter extends OncePerRequestFilter {

    @org.springframework.beans.factory.annotation.Value("${ADMIN_EMAIL:}")
    private String adminEmail;

    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, 
                                    @NonNull HttpServletResponse response, 
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            try {
                // MOCK AUTH BYPASS FOR LOCAL TESTING
                if (token.startsWith("mock-")) {
                    String mockEmail = token.substring(5);
                    System.out.println("DEBUG: Mock Auth triggered for email: [" + mockEmail + "]");
                    userRepository.findByEmail(mockEmail).ifPresentOrElse(user -> {
                        System.out.println("DEBUG: Found mock user in DB: " + user.getEmail() + " with role: " + user.getRole());
                        UserDetails userDetails = UserPrincipal.create(user);
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        request.setAttribute("userId", user.getId());
                    }, () -> {
                        System.out.println("DEBUG: Mock user NOT FOUND in DB for email: [" + mockEmail + "]");
                    });
                    filterChain.doFilter(request, response);
                    return;
                }

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

                // Sync ADMIN role strictly based on environment variable
                boolean rolesChanged = false;
                if (adminEmail != null && !adminEmail.trim().isEmpty() && email != null) {
                    String safeAdminEmail = adminEmail.trim().toLowerCase();
                    String safeUserEmail = email.trim().toLowerCase();

                    if (safeUserEmail.equalsIgnoreCase(safeAdminEmail)) {
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
                } else {
                    // If no admin email is set or incoming email is null, ensure they are demoted if they hold ADMIN
                    if ("ADMIN".equals(user.getRole())) {
                        user.setRole("USER");
                        rolesChanged = true;
                    }
                }

                if (rolesChanged) {
                    user = userRepository.save(user);
                }

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
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return; // Stop processing the request chain
            } catch (Exception e) {
                 System.err.println("Authentication error: " + e.getMessage());
                 e.printStackTrace();
                 response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                 return; // Stop — do not let an unauthenticated request through
            }
        }

        filterChain.doFilter(request, response);
    }
}
