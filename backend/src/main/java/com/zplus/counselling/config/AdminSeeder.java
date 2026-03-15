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

    private final UserRepository userRepository;

    @Override
    @Transactional
    public void run(String... args) {
        String adminEmail = System.getenv("ADMIN_BOOTSTRAP_EMAIL");
        
        if (adminEmail == null || adminEmail.isEmpty()) {
            log.warn("ADMIN_BOOTSTRAP_EMAIL environment variable not set. Skipping admin seeder.");
            return;
        }

        log.info("Checking if user with email {} needs admin promotion...", adminEmail);
        
        Optional<User> userOptional = userRepository.findByEmail(adminEmail);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!"ADMIN".equals(user.getRole())) {
                user.setRole("ADMIN");
                userRepository.save(user);
                log.info("✅ SUCCESS: User {} promoted to ADMIN role.", adminEmail);
            } else {
                log.info("ℹ️ User {} already has ADMIN role.", adminEmail);
            }
        } else {
            log.warn("⚠️ Warning: User with email {} not found in database. Bootstrap failed.", adminEmail);
        }
    }
}
