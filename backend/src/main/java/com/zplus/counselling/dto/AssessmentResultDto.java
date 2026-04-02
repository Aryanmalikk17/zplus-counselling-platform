package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * AssessmentResultDto — Refactored to use Lombok for boilerplate reduction.
 * 
 * Provides:
 * - @Data: Getters, Setters, toString, equals, and hashCode.
 * - @Builder: Standard builder pattern matching the previous manual implementation.
 * - @NoArgsConstructor & @AllArgsConstructor: Standard constructors for Jackson/Service usage.
 */
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

    private Integer aptitudeScore;
    private Integer maxScore;
    private Boolean isAptitudeTest;
}