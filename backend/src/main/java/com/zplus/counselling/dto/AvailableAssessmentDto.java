package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AvailableAssessmentDto {
    private String testType;
    private String title;
    private String description;
    private String category;
    private Integer estimatedTimeMinutes;
    private Integer totalQuestions;
    private Boolean isCompleted;
    private LocalDateTime lastAttemptDate;
    private Double price;
    private String difficulty;
}