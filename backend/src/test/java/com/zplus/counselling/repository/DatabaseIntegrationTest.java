package com.zplus.counselling.repository;

import com.zplus.counselling.entity.postgres.TestResult;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.repository.postgres.TestResultRepository;
import com.zplus.counselling.repository.postgres.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class DatabaseIntegrationTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestResultRepository testResultRepository;

    private User testUser;

    @BeforeEach
    void setUp() {
        // Clean up database
        testResultRepository.deleteAll();
        userRepository.deleteAll();

        // Create test user
        testUser = new User();
        testUser.setEmail("test@example.com");
        testUser.setFullName("Test User");
        testUser.setPasswordHash("hashedpassword");
        testUser.setDateOfBirth(LocalDate.of(1990, 1, 1));
        testUser.setGender("Male");
        testUser.setPhone("1234567890");
        testUser.setIsActive(true);
        testUser.setIsEmailVerified(true);
        testUser.setCreatedAt(LocalDateTime.now());
        testUser.setUpdatedAt(LocalDateTime.now());
        
        testUser = userRepository.save(testUser);
    }

    @Test
    void testUserCRUDOperations() {
        // Test Create (already done in setUp)
        assertThat(testUser.getId()).isNotNull();
        assertThat(testUser.getEmail()).isEqualTo("test@example.com");

        // Test Read
        Optional<User> foundUser = userRepository.findByEmail("test@example.com");
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getFullName()).isEqualTo("Test User");

        // Test Update
        testUser.setFullName("Updated Test User");
        User updatedUser = userRepository.save(testUser);
        assertThat(updatedUser.getFullName()).isEqualTo("Updated Test User");

        // Test Delete
        userRepository.delete(testUser);
        Optional<User> deletedUser = userRepository.findByEmail("test@example.com");
        assertThat(deletedUser).isEmpty();
    }

    @Test
    void testTestResultWithJSONBColumns() {
        // Test creating TestResult with JSONB columns (this tests our H2JsonDialect)
        TestResult testResult = new TestResult();
        testResult.setUser(testUser);
        testResult.setTestType("PERSONALITY");
        testResult.setTestVersion("1.0");
        testResult.setIsCompleted(true);
        testResult.setCompletionPercentage(100);
        testResult.setDurationMinutes(30);
        testResult.setPersonalityType("INTJ");
        testResult.setCreatedAt(LocalDateTime.now());
        testResult.setUpdatedAt(LocalDateTime.now());

        // Set JSONB fields using Maps and Lists - these will test our H2JsonDialect conversion
        Map<String, Object> rawAnswers = new HashMap<>();
        rawAnswers.put("q1", "A");
        rawAnswers.put("q2", "B");
        rawAnswers.put("q3", "C");
        testResult.setRawAnswers(rawAnswers);

        Map<String, Object> rawScores = new HashMap<>();
        rawScores.put("openness", 8);
        rawScores.put("conscientiousness", 7);
        rawScores.put("extraversion", 6);
        testResult.setRawScores(rawScores);

        Map<String, Object> calculatedResults = new HashMap<>();
        calculatedResults.put("dominant", "Thinking");
        calculatedResults.put("auxiliary", "Intuition");
        testResult.setCalculatedResults(calculatedResults);

        testResult.setPrimaryTraits(Arrays.asList("Analytical", "Independent", "Strategic"));
        testResult.setStrengths(Arrays.asList("Problem-solving", "Leadership", "Innovation"));
        testResult.setWeaknesses(Arrays.asList("Impatience", "Perfectionism"));
        testResult.setCareerSuggestions(Arrays.asList("Software Engineer", "Data Scientist", "Consultant"));

        TestResult savedResult = testResultRepository.save(testResult);

        // Verify the test result was saved with JSONB data
        assertThat(savedResult.getId()).isNotNull();
        assertThat(savedResult.getRawAnswers()).containsKey("q1");
        assertThat(savedResult.getRawScores()).containsKey("openness");
        assertThat(savedResult.getCalculatedResults()).containsKey("dominant");
        assertThat(savedResult.getPrimaryTraits()).contains("Analytical");
        assertThat(savedResult.getStrengths()).contains("Problem-solving");
        assertThat(savedResult.getWeaknesses()).contains("Impatience");
        assertThat(savedResult.getCareerSuggestions()).contains("Software Engineer");

        // Test finding by user
        List<TestResult> userResults = testResultRepository.findByUserId(testUser.getId());
        assertThat(userResults).hasSize(1);
        assertThat(userResults.get(0).getTestType()).isEqualTo("PERSONALITY");
    }

    @Test
    void testUserTestResultRelationship() {
        // Create multiple test results for the user
        TestResult result1 = createTestResult("PERSONALITY", "INTJ");
        TestResult result2 = createTestResult("REASONING", "HIGH");
        
        testResultRepository.save(result1);
        testResultRepository.save(result2);

        // Test finding all results for user
        List<TestResult> userResults = testResultRepository.findByUserId(testUser.getId());
        assertThat(userResults).hasSize(2);

        // Test filtering by test type
        List<TestResult> personalityResults = testResultRepository.findByUserIdAndTestType(
            testUser.getId(), "PERSONALITY");
        assertThat(personalityResults).hasSize(1);
        assertThat(personalityResults.get(0).getPersonalityType()).isEqualTo("INTJ");
    }

    private TestResult createTestResult(String testType, String personalityType) {
        TestResult testResult = new TestResult();
        testResult.setUser(testUser);
        testResult.setTestType(testType);
        testResult.setTestVersion("1.0");
        testResult.setIsCompleted(true);
        testResult.setCompletionPercentage(100);
        testResult.setDurationMinutes(25);
        testResult.setPersonalityType(personalityType);
        testResult.setCreatedAt(LocalDateTime.now());
        testResult.setUpdatedAt(LocalDateTime.now());
        
        // Set empty JSON objects for required fields
        testResult.setRawAnswers(new HashMap<>());
        testResult.setRawScores(new HashMap<>());
        testResult.setCalculatedResults(new HashMap<>());
        testResult.setPrimaryTraits(new ArrayList<>());
        testResult.setStrengths(new ArrayList<>());
        testResult.setWeaknesses(new ArrayList<>());
        testResult.setCareerSuggestions(new ArrayList<>());
        
        return testResult;
    }
}