package com.zplus.counselling.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitAnswerRequest {
    @NotNull(message = "Session ID is required")
    private String sessionId;
    
    @NotBlank(message = "Question ID is required")
    private String questionId;
    
    @NotBlank(message = "Answer is required")
    private String answer;
    
    private Double responseTime;
}