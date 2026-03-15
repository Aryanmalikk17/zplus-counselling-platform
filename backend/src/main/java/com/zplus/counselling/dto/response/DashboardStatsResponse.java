package com.zplus.counselling.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private long totalAssessments;
    private long activeStudents;
    private long testsCompleted;
    private String averageScore; // e.g., "74%" or "N/A"
}
