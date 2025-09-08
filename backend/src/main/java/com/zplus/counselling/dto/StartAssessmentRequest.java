package com.zplus.counselling.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StartAssessmentRequest {
    @NotBlank(message = "Template ID is required")
    private String templateId;
    
    private String testVersion;
    private String language;
}