package com.zplus.counselling.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

public class AnswerSubmissionRequest {
    
    @NotBlank(message = "Question ID is required")
    private String questionId;
    
    @NotNull(message = "Answer is required")
    private Object answer;

    public String getQuestionId() { return questionId; }
    public void setQuestionId(String questionId) { this.questionId = questionId; }

    public Object getAnswer() { return answer; }
    public void setAnswer(Object answer) { this.answer = answer; }
}