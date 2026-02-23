package com.zplus.counselling.entity.postgres;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_answers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserAnswer extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private AssessmentSession session;

    @Column(name = "question_id", nullable = false)
    private String questionId; // References MongoDB question

    @Column(name = "question_number", nullable = false)
    private Integer questionNumber;

    @Column(name = "selected_option_id")
    private String selectedOptionId;

    @Column(name = "selected_option_text", columnDefinition = "TEXT")
    private String selectedOptionText;

    @Column(name = "score_value")
    private Double scoreValue;

    @Column(name = "time_spent_seconds")
    private Long timeSpentSeconds;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    // Helper methods
    public void setCorrect(boolean correct) {
        this.isCorrect = correct;
    }

    public boolean isAnswered() {
        return selectedOptionId != null || selectedOptionText != null;
    }

    public AssessmentSession getSession() { return session; }
    public void setSession(AssessmentSession session) { this.session = session; }

    public String getQuestionId() { return questionId; }
    public void setQuestionId(String questionId) { this.questionId = questionId; }

    public Integer getQuestionNumber() { return questionNumber; }
    public void setQuestionNumber(Integer questionNumber) { this.questionNumber = questionNumber; }

    public String getSelectedOptionId() { return selectedOptionId; }
    public void setSelectedOptionId(String selectedOptionId) { this.selectedOptionId = selectedOptionId; }

    public String getSelectedOptionText() { return selectedOptionText; }
    public void setSelectedOptionText(String selectedOptionText) { this.selectedOptionText = selectedOptionText; }

    public Double getScoreValue() { return scoreValue; }
    public void setScoreValue(Double scoreValue) { this.scoreValue = scoreValue; }

    public Long getTimeSpentSeconds() { return timeSpentSeconds; }
    public void setTimeSpentSeconds(Long timeSpentSeconds) { this.timeSpentSeconds = timeSpentSeconds; }

    public Boolean getIsCorrect() { return isCorrect; }
    public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }
}