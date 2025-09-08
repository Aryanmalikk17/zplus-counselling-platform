package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentResultDto {
    private String resultId;
    private String personalityType;
    private Map<String, Integer> scores;
    private ResultSummaryDto summary;
    private String reportUrl;
    private LocalDateTime completedAt;
}