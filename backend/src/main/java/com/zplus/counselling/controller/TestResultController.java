package com.zplus.counselling.controller;

import com.zplus.counselling.dto.FrontendTestResultDto;
import com.zplus.counselling.dto.response.ApiResponse;
import com.zplus.counselling.entity.postgres.TestResult;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.repository.postgres.TestResultRepository;
import com.zplus.counselling.repository.postgres.UserRepository;
import com.zplus.counselling.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/test-results")
@RequiredArgsConstructor
@Tag(name = "Test Results", description = "Endpoints for saving frontend test results")
public class TestResultController {

    private final TestResultRepository testResultRepository;
    private final UserRepository userRepository;

    @PostMapping
    @Operation(summary = "Save frontend test result")
    public ResponseEntity<ApiResponse<String>> saveTestResult(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody FrontendTestResultDto resultDto) {
        
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        TestResult testResult = new TestResult();
        testResult.setUser(user);
        testResult.setTestType(resultDto.getTestType() != null ? resultDto.getTestType() : "UNKNOWN");
        testResult.setTestVersion("1.0");
        testResult.setCompletionPercentage(resultDto.getPercentage() != null ? resultDto.getPercentage() : 0);
        testResult.setDurationMinutes(resultDto.getTimeSpent() != null ? resultDto.getTimeSpent() / 60 : 0);
        testResult.setIsCompleted(true);
        testResult.setCreatedAt(LocalDateTime.now());
        testResult.setUpdatedAt(LocalDateTime.now());

        // Map raw answers
        Map<String, Object> rawAnswers = new HashMap<>();
        if (resultDto.getDetailedAnswers() != null) {
            for (Map<String, Object> answer : resultDto.getDetailedAnswers()) {
                rawAnswers.put((String) answer.get("questionId"), answer);
            }
        }
        testResult.setRawAnswers(rawAnswers);
        
        // Map calculated results
        Map<String, Object> calculatedResults = new HashMap<>();
        calculatedResults.put("score", resultDto.getScore());
        calculatedResults.put("percentage", resultDto.getPercentage());
        calculatedResults.put("grade", resultDto.getGrade());
        calculatedResults.put("isPassed", resultDto.getIsPassed());
        calculatedResults.put("categoryResults", resultDto.getCategoryResults());
        testResult.setCalculatedResults(calculatedResults);

        // Map strengths/weaknesses
        testResult.setStrengths(resultDto.getStrengths());
        testResult.setWeaknesses(resultDto.getWeaknesses());
        testResult.setCareerSuggestions(resultDto.getRecommendations());

        // Set empty required fields if null
        if (testResult.getRawScores() == null) testResult.setRawScores(new HashMap<>());
        if (testResult.getPrimaryTraits() == null) testResult.setPrimaryTraits(java.util.Collections.emptyList());

        TestResult savedResult = testResultRepository.save(testResult);

        return ResponseEntity.ok(ApiResponse.success(savedResult.getId().toString(), "Test result saved successfully"));
    }
}
