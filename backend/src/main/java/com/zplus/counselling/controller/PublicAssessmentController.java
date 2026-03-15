package com.zplus.counselling.controller;

import com.zplus.counselling.dto.AvailableAssessmentDto;
import com.zplus.counselling.dto.response.ApiResponse;
import com.zplus.counselling.service.AssessmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/public/assessments")
@RequiredArgsConstructor
@Tag(name = "Public Assessment APIs", description = "Endpoints for public assessment listing")
public class PublicAssessmentController {

    private final AssessmentService assessmentService;

    @GetMapping
    @Operation(summary = "Get all active assessments", description = "Retrieve a list of all active assessments for the public portal")
    public ResponseEntity<ApiResponse<List<AvailableAssessmentDto>>> getPublicAssessments() {
        List<AvailableAssessmentDto> assessments = assessmentService.getPublicAssessments();
        return ResponseEntity.ok(ApiResponse.success(assessments));
    }
}
