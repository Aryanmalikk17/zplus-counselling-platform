package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentSessionDto {
    private Long id;
    private String templateId;
    private String templateTitle;
    private String templateType;
    private String status;
    private Integer currentQuestionIndex;
    private Integer totalQuestions;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private Long timeSpentSeconds;
    private Double progressPercentage;
    private List<UserAnswerDto> answers;

    // Constructor for basic session info
    public AssessmentSessionDto(Long id, String templateId, String templateTitle, String status, 
                              Integer currentQuestionIndex, LocalDateTime startedAt) {
        this.id = id;
        this.templateId = templateId;
        this.templateTitle = templateTitle;
        this.status = status;
        this.currentQuestionIndex = currentQuestionIndex;
        this.startedAt = startedAt;
    }
}