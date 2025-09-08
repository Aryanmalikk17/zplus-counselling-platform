package com.zplus.counselling.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompleteAssessmentRequest {
    @NotNull(message = "Session ID is required")
    private String sessionId;
}