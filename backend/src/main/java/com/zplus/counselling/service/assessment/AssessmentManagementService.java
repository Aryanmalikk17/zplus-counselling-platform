package com.zplus.counselling.service.assessment;

import com.zplus.counselling.entity.mongodb.AssessmentTemplate;
import com.zplus.counselling.entity.postgres.TestResult;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.repository.mongodb.AssessmentTemplateRepository;
import com.zplus.counselling.repository.postgres.TestResultRepository;
import com.zplus.counselling.service.auth.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssessmentManagementService {

    private final AssessmentTemplateRepository assessmentTemplateRepository;
    private final TestResultRepository testResultRepository;
    private final UserService userService;
    private final ScoringService scoringService;

    public List<AssessmentTemplate> getAvailableAssessments() {
        return assessmentTemplateRepository.findByIsActiveTrueOrderByCreatedAtDesc();
    }

    public AssessmentTemplate getAssessmentByType(String testType) {
        return assessmentTemplateRepository.findByTestTypeAndIsActiveTrue(testType)
            .orElseThrow(() -> new RuntimeException("Assessment not found: " + testType));
    }

    @Transactional
    public TestResult startAssessment(UUID userId, String testType) {
        User user = userService.findById(userId);
        
        // Check if user already has a completed test of this type
        if (testResultRepository.existsByUserIdAndTestTypeAndIsCompletedTrue(userId, testType)) {
            throw new RuntimeException("User has already completed this assessment");
        }

        // Check if there's an existing incomplete test
        List<TestResult> existingTests = testResultRepository.findByUserIdAndTestTypeOrderByCreatedAtDesc(userId, testType);
        if (!existingTests.isEmpty() && !existingTests.get(0).getIsCompleted()) {
            return existingTests.get(0); // Return existing incomplete test
        }

        // Create new test result
        TestResult testResult = new TestResult();
        testResult.setUser(user);
        testResult.setTestType(testType);
        testResult.setCompletionPercentage(0);
        testResult.setIsCompleted(false);

        return testResultRepository.save(testResult);
    }

    @Transactional
    public TestResult submitAnswer(UUID testResultId, String questionId, Object answer) {
        TestResult testResult = testResultRepository.findById(testResultId)
            .orElseThrow(() -> new RuntimeException("Test result not found"));

        if (testResult.getIsCompleted()) {
            throw new RuntimeException("Test is already completed");
        }

        // Store the answer
        Map<String, Object> answers = testResult.getRawAnswers();
        if (answers == null) {
            answers = new java.util.HashMap<>();
        }
        answers.put(questionId, answer);
        testResult.setRawAnswers(answers);

        // Calculate progress
        AssessmentTemplate template = getAssessmentByType(testResult.getTestType());
        int totalQuestions = template.getTotalQuestions();
        int answeredQuestions = answers.size();
        int completionPercentage = (answeredQuestions * 100) / totalQuestions;
        testResult.setCompletionPercentage(completionPercentage);

        return testResultRepository.save(testResult);
    }

    @Transactional
    public TestResult completeAssessment(UUID testResultId) {
        TestResult testResult = testResultRepository.findById(testResultId)
            .orElseThrow(() -> new RuntimeException("Test result not found"));

        if (testResult.getIsCompleted()) {
            throw new RuntimeException("Test is already completed");
        }

        // Calculate scores and results
        AssessmentTemplate template = getAssessmentByType(testResult.getTestType());
        Map<String, Object> scores = scoringService.calculateScores(testResult.getRawAnswers(), template);
        Map<String, Object> results = scoringService.generateResults(scores, template);

        testResult.setRawScores(scores);
        testResult.setCalculatedResults(results);
        testResult.setIsCompleted(true);
        testResult.setCompletionPercentage(100);

        // Extract specific fields based on test type
        extractResultFields(testResult, results);

        return testResultRepository.save(testResult);
    }

    public List<TestResult> getUserTestHistory(UUID userId) {
        return testResultRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public TestResult getTestResult(UUID testResultId) {
        return testResultRepository.findById(testResultId)
            .orElseThrow(() -> new RuntimeException("Test result not found"));
    }

    private void extractResultFields(TestResult testResult, Map<String, Object> results) {
        // Extract personality type, traits, etc. based on test type
        if (results.containsKey("personalityType")) {
            testResult.setPersonalityType((String) results.get("personalityType"));
        }
        
        if (results.containsKey("primaryTraits")) {
            @SuppressWarnings("unchecked")
            List<String> primaryTraits = (List<String>) results.get("primaryTraits");
            testResult.setPrimaryTraits(primaryTraits);
        }
        
        if (results.containsKey("strengths")) {
            @SuppressWarnings("unchecked")
            List<String> strengths = (List<String>) results.get("strengths");
            testResult.setStrengths(strengths);
        }
        
        if (results.containsKey("weaknesses")) {
            @SuppressWarnings("unchecked")
            List<String> weaknesses = (List<String>) results.get("weaknesses");
            testResult.setWeaknesses(weaknesses);
        }
        
        if (results.containsKey("careerSuggestions")) {
            @SuppressWarnings("unchecked")
            List<String> careerSuggestions = (List<String>) results.get("careerSuggestions");
            testResult.setCareerSuggestions(careerSuggestions);
        }
    }
}