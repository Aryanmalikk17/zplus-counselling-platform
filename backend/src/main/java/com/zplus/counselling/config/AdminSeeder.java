package com.zplus.counselling.config;

import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.repository.postgres.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class AdminSeeder implements CommandLineRunner {

    @org.springframework.beans.factory.annotation.Value("${ADMIN_EMAIL:}")
    private String adminEmail;

    private final UserRepository userRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (adminEmail == null || adminEmail.trim().isEmpty()) {
            log.warn("ADMIN_EMAIL environment variable not set. Skipping admin seeder.");
            return;
        }

        String safeAdminEmail = adminEmail.trim().toLowerCase();
        log.info("Checking if user with email {} needs to be created or promoted...", safeAdminEmail);
        
        Optional<User> userOptional = userRepository.findByEmail(safeAdminEmail);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!"ADMIN".equals(user.getRole())) {
                user.setRole("ADMIN");
                userRepository.save(user);
                log.info("✅ SUCCESS: User {} promoted to ADMIN role.", safeAdminEmail);
            } else {
                log.info("ℹ️ User {} already has ADMIN role.", safeAdminEmail);
            }
        } else {
            log.info("🚀 Creating NEW Admin account for email: {}", safeAdminEmail);
            User newAdmin = new User();
            newAdmin.setEmail(safeAdminEmail);
            newAdmin.setFullName("System Admin");
            // Set default password: admin123
            newAdmin.setPasswordHash(passwordEncoder.encode("admin123"));
            newAdmin.setRole("ADMIN");
            newAdmin.setProvider("LOCAL");
            newAdmin.setIsActive(true);
            newAdmin.setIsEmailVerified(true);
            newAdmin.setCreatedAt(java.time.LocalDateTime.now());
            newAdmin.setUpdatedAt(java.time.LocalDateTime.now());
            
            userRepository.save(newAdmin);
            log.info("✅ SUCCESS: New admin user created! Use password 'admin123' to login.");
        }
    }
}
