package com.zplus.counselling.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class TestResultResponse {
    
    private UUID id;
    private String testType;
    private String personalityType;
    private Integer completionPercentage;
    private Boolean isCompleted;
    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> careerSuggestions;
    private LocalDateTime createdAt;
}