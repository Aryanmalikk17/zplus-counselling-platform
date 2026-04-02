package com.zplus.counselling.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * AnswerSubmissionRequest — Refactored to use Lombok.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerSubmissionRequest {
    
    @NotBlank(message = "Question ID is required")
    private String questionId;
    
    @NotNull(message = "Answer is required")
    private Object answer;
}
