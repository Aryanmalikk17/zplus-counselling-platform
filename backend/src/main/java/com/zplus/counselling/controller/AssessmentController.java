package com.zplus.counselling.controller;

import com.zplus.counselling.dto.*;
import com.zplus.counselling.dto.response.ApiResponse;
import com.zplus.counselling.security.UserPrincipal;
import com.zplus.counselling.service.AssessmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/assessments")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Assessment APIs", description = "Dynamic assessment and testing endpoints")
@SecurityRequirement(name = "Bearer Authentication")
public class AssessmentController {

    private final AssessmentService assessmentService;

    @GetMapping("/available")
    @Operation(summary = "Get available assessments", 
               description = "Retrieve all active assessment templates available to the user")
    public ResponseEntity<ApiResponse<List<AvailableAssessmentDto>>> getAvailableAssessments(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Getting available assessments for user: {}", userPrincipal.getId());
        
        List<AvailableAssessmentDto> assessments = assessmentService.getAvailableAssessments(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(assessments));
    }

    @PostMapping("/{testType}/start")
    @Operation(summary = "Start new assessment", 
               description = "Initialize a new assessment session for the specified test type")
    public ResponseEntity<ApiResponse<StartAssessmentResponse>> startAssessment(
            @Parameter(description = "Assessment test type (e.g., MBTI, BIG_FIVE)") 
            @PathVariable String testType,
            @Valid @RequestBody StartAssessmentRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Starting assessment {} for user: {}", testType, userPrincipal.getId());
        
        StartAssessmentResponse response = assessmentService.startAssessment(
                userPrincipal.getId(), testType, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Assessment started successfully"));
    }

    @PutMapping("/{testType}/answer")
    @Operation(summary = "Submit answer", 
               description = "Submit an answer for a question in the current assessment session")
    public ResponseEntity<ApiResponse<SubmitAnswerResponse>> submitAnswer(
            @Parameter(description = "Assessment test type") 
            @PathVariable String testType,
            @Valid @RequestBody SubmitAnswerRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Submitting answer for assessment {} session: {}", testType, request.getSessionId());
        
        SubmitAnswerResponse response = assessmentService.submitAnswer(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/{testType}/submit")
    @Operation(summary = "Complete assessment", 
               description = "Complete the assessment and calculate final results")
    public ResponseEntity<ApiResponse<AssessmentResultDto>> completeAssessment(
            @Parameter(description = "Assessment test type") 
            @PathVariable String testType,
            @Valid @RequestBody CompleteAssessmentRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Completing assessment {} session: {}", testType, request.getSessionId());
        
        AssessmentResultDto result = assessmentService.completeAssessment(request.getSessionId());
        return ResponseEntity.ok(ApiResponse.success(result, "Assessment completed successfully"));
    }

    @GetMapping("/{testType}/result/{resultId}")
    @Operation(summary = "Get assessment result", 
               description = "Retrieve specific assessment result by ID")
    public ResponseEntity<ApiResponse<AssessmentResultDto>> getAssessmentResult(
            @Parameter(description = "Assessment test type") 
            @PathVariable String testType,
            @Parameter(description = "Result ID") 
            @PathVariable String resultId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Getting assessment result {} for user: {}", resultId, userPrincipal.getId());
        
        AssessmentResultDto result = assessmentService.getAssessmentResult(resultId, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @GetMapping("/current")
    @Operation(summary = "Get current session", 
               description = "Get the current active assessment session for the user")
    public ResponseEntity<ApiResponse<AssessmentSessionDto>> getCurrentSession(
            @RequestParam String templateId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Getting current session for user: {} and template: {}", userPrincipal.getId(), templateId);
        
        AssessmentSessionDto session = assessmentService.getCurrentSession(userPrincipal.getId(), templateId);
        return ResponseEntity.ok(ApiResponse.success(session));
    }

    @GetMapping("/history")
    @Operation(summary = "Get assessment history", 
               description = "Retrieve user's complete assessment history")
    public ResponseEntity<ApiResponse<List<AssessmentSessionDto>>> getAssessmentHistory(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Getting assessment history for user: {}", userPrincipal.getId());
        
        List<AssessmentSessionDto> history = assessmentService.getUserAssessmentHistory(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(history));
    }

    @PostMapping("/session/{sessionId}/complete")
    @Operation(summary = "Complete session", 
               description = "Mark an assessment session as complete")
    public ResponseEntity<ApiResponse<AssessmentResultDto>> completeSession(
            @Parameter(description = "Session ID") 
            @PathVariable Long sessionId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Completing session {} for user: {}", sessionId, userPrincipal.getId());
        
        AssessmentResultDto result = assessmentService.completeAssessment(sessionId.toString());
        return ResponseEntity.ok(ApiResponse.success(result, "Session completed successfully"));
    }
}