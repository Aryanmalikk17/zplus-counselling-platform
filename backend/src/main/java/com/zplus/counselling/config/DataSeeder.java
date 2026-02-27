package com.zplus.counselling.config;

import com.zplus.counselling.entity.mongodb.AssessmentTemplate;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.repository.mongodb.AssessmentTemplateRepository;
import com.zplus.counselling.repository.postgres.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final AssessmentTemplateRepository assessmentTemplateRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Seed admin user first (PostgreSQL — always available)
        try {
            seedAdminUser();
        } catch (Exception e) {
            log.error("Failed to seed admin user: {}", e.getMessage());
        }

        // Seed MongoDB templates — wrapped so a missing Mongo doesn't crash the app
        try {
            seedIQTest();
            seedTATTest();
        } catch (Exception e) {
            log.warn("⚠️  MongoDB is not reachable. Skipping assessment template seeding. " +
                     "Set MONGODB_URI to a valid MongoDB Atlas connection string. Error: {}", e.getMessage());
        }
    }

    private void seedAdminUser() {
        String adminEmail = "admin@zpluscounselling.com";
        if (userRepository.findByEmail(adminEmail).isPresent()) {
            return;
        }
        log.info("Seeding Admin User...");
        
        User admin = new User();
        admin.setEmail(adminEmail);
        admin.setPasswordHash(passwordEncoder.encode("admin123"));
        admin.setFullName("System Admin");
        admin.setRole("ADMIN");
        admin.setIsActive(true);
        admin.setIsEmailVerified(true);
        admin.setIsPhoneVerified(true);
        admin.setCreatedAt(LocalDateTime.now());
        admin.setUpdatedAt(LocalDateTime.now());
        
        userRepository.save(admin);
        log.info("Admin user seeded: {} / admin123", adminEmail);
    }

    private void seedIQTest() {
        if (assessmentTemplateRepository.findByTestTypeAndIsActiveTrue("iq-test").isPresent()) {
            return;
        }
        log.info("Seeding IQ Test Template...");

        AssessmentTemplate template = new AssessmentTemplate();
        template.setTestType("iq-test");
        template.setTitle("IQ Assessment");
        template.setDescription("Comprehensive cognitive ability assessment measuring multiple intelligence factors");
        template.setCategory("Cognitive");
        template.setEstimatedTimeMinutes(45);
        template.setTotalQuestions(2); // Reduced for brevity in this seeder
        template.setIsActive(true);
        template.setInstructions(List.of(
            "Read each question carefully and select the best answer",
            "Work through problems systematically and logically",
            "Skip difficult questions and return to them later if needed",
            "Use scratch paper for calculations if necessary",
            "Focus on accuracy rather than speed for best results"
        ));
        template.setCreatedAt(LocalDateTime.now());
        template.setUpdatedAt(LocalDateTime.now());

        List<AssessmentTemplate.Question> questions = new ArrayList<>();
        
        // Q1
        AssessmentTemplate.Question q1 = new AssessmentTemplate.Question();
        q1.setId("iq1");
        q1.setType("MULTIPLE_CHOICE");
        q1.setText("If all roses are flowers and some flowers are red, which conclusion is valid?");
        q1.setCategory("logical reasoning");
        q1.setPoints(10);
        q1.setCorrectAnswer("Some roses might be red");
        q1.setOptions(List.of(
            createOption("a", "All roses are red"),
            createOption("b", "Some roses might be red"),
            createOption("c", "No roses are red"),
            createOption("d", "All red things are roses")
        ));
        questions.add(q1);

        // Q2
        AssessmentTemplate.Question q2 = new AssessmentTemplate.Question();
        q2.setId("iq2");
        q2.setType("MULTIPLE_CHOICE");
        q2.setText("What comes next in the sequence: 2, 6, 18, 54, ?");
        q2.setCategory("pattern recognition");
        q2.setPoints(10);
        q2.setCorrectAnswer("162");
        q2.setOptions(List.of(
            createOption("a", "108"),
            createOption("b", "162"),
            createOption("c", "216"),
            createOption("d", "324")
        ));
        questions.add(q2);

        template.setQuestions(questions);
        assessmentTemplateRepository.save(template);
    }

    private void seedTATTest() {
        if (assessmentTemplateRepository.findByTestTypeAndIsActiveTrue("tat-test").isPresent()) {
            return;
        }
        log.info("Seeding TAT Test Template...");

        AssessmentTemplate template = new AssessmentTemplate();
        template.setTestType("tat-test");
        template.setTitle("TAT (Thematic Apperception Test)");
        template.setDescription("Assess personality, motivation, and psychological needs through story interpretation");
        template.setCategory("SSB");
        template.setEstimatedTimeMinutes(60);
        template.setTotalQuestions(1); // Reduced for brevity
        template.setIsActive(true);
        template.setInstructions(List.of(
            "Look at each picture carefully for 30 seconds before writing",
            "Write a complete story including: What is happening? What led to this? What are the people thinking/feeling? What will happen next?",
            "Write in first person as much as possible",
            "Be creative and express your natural thoughts - there are no right or wrong answers",
            "Each story should be 150-200 words approximately",
            "You have 4 minutes per picture to write your story"
        ));
        template.setCreatedAt(LocalDateTime.now());
        template.setUpdatedAt(LocalDateTime.now());

        List<AssessmentTemplate.Question> questions = new ArrayList<>();

        // Q1
        AssessmentTemplate.Question q1 = new AssessmentTemplate.Question();
        q1.setId("tat_example");
        q1.setType("TEXT");
        q1.setText("EXAMPLE: Look at this image and write a story about what you see.");
        q1.setCategory("personality assessment");
        q1.setImage("/images/tat/example-contemplation.jpg");
        q1.setTimeLimit(240);
        questions.add(q1);

        template.setQuestions(questions);
        assessmentTemplateRepository.save(template);
    }

    private AssessmentTemplate.Option createOption(String id, String text) {
        AssessmentTemplate.Option option = new AssessmentTemplate.Option();
        option.setId(id);
        option.setText(text);
        return option;
    }
}
