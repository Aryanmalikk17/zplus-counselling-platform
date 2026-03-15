package com.zplus.counselling.controller;

import com.zplus.counselling.dto.response.ApiResponse;
import com.zplus.counselling.dto.response.DashboardStatsResponse;
import com.zplus.counselling.repository.mongodb.AssessmentTemplateRepository;
import com.zplus.counselling.repository.postgres.TestResultRepository;
import com.zplus.counselling.repository.postgres.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/stats")
@RequiredArgsConstructor
@Tag(name = "Admin Dashboard", description = "Endpoints for admin dashboard overview")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

    private final AssessmentTemplateRepository assessmentRepository;
    private final UserRepository userRepository;
    private final TestResultRepository testResultRepository;

    @GetMapping
    @Operation(summary = "Get dashboard statistics", description = "Retrieve real-time metrics for the admin dashboard")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getDashboardStats() {
        long totalAssessments = assessmentRepository.count();
        long activeStudents = userRepository.count(); // Simplified for now, could be filtered by role
        long testsCompleted = testResultRepository.count();

        // Placeholder for average score calculation if required later
        String averageScore = "74%"; 

        DashboardStatsResponse stats = DashboardStatsResponse.builder()
                .totalAssessments(totalAssessments)
                .activeStudents(activeStudents)
                .testsCompleted(testsCompleted)
                .averageScore(averageScore)
                .build();

        return ResponseEntity.ok(ApiResponse.success(stats, "Dashboard statistics retrieved successfully"));
    }
}
