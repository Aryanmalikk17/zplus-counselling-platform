package com.zplus.counselling.dto;

import java.time.LocalDateTime;
import java.util.List;

public class AssessmentSessionDto {
    private String id;
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

    public AssessmentSessionDto() {}

    public AssessmentSessionDto(String id, String templateId, String templateTitle, String status,
                              Integer currentQuestionIndex, LocalDateTime startedAt) {
        this.id = id;
        this.templateId = templateId;
        this.templateTitle = templateTitle;
        this.status = status;
        this.currentQuestionIndex = currentQuestionIndex;
        this.startedAt = startedAt;
    }

    public AssessmentSessionDto(String id, String templateId, String templateTitle, String templateType, String status, Integer currentQuestionIndex, Integer totalQuestions, LocalDateTime startedAt, LocalDateTime completedAt, Long timeSpentSeconds, Double progressPercentage, List<UserAnswerDto> answers) {
        this.id = id;
        this.templateId = templateId;
        this.templateTitle = templateTitle;
        this.templateType = templateType;
        this.status = status;
        this.currentQuestionIndex = currentQuestionIndex;
        this.totalQuestions = totalQuestions;
        this.startedAt = startedAt;
        this.completedAt = completedAt;
        this.timeSpentSeconds = timeSpentSeconds;
        this.progressPercentage = progressPercentage;
        this.answers = answers;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTemplateId() { return templateId; }
    public void setTemplateId(String templateId) { this.templateId = templateId; }

    public String getTemplateTitle() { return templateTitle; }
    public void setTemplateTitle(String templateTitle) { this.templateTitle = templateTitle; }

    public String getTemplateType() { return templateType; }
    public void setTemplateType(String templateType) { this.templateType = templateType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getCurrentQuestionIndex() { return currentQuestionIndex; }
    public void setCurrentQuestionIndex(Integer currentQuestionIndex) { this.currentQuestionIndex = currentQuestionIndex; }

    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }

    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }

    public Long getTimeSpentSeconds() { return timeSpentSeconds; }
    public void setTimeSpentSeconds(Long timeSpentSeconds) { this.timeSpentSeconds = timeSpentSeconds; }

    public Double getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Double progressPercentage) { this.progressPercentage = progressPercentage; }

    public List<UserAnswerDto> getAnswers() { return answers; }
    public void setAnswers(List<UserAnswerDto> answers) { this.answers = answers; }

}