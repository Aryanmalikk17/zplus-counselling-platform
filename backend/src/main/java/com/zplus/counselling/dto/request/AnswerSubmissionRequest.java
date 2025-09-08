package com.zplus.counselling.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AnswerSubmissionRequest {
    
    @NotBlank(message = "Question ID is required")
    private String questionId;
    
    @NotNull(message = "Answer is required")
    private Object answer;
}