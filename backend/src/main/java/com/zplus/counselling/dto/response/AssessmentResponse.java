package com.zplus.counselling.dto.response;

import com.zplus.counselling.entity.mongodb.AssessmentTemplate;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AssessmentResponse {
    
    private String id;
    private String testType;
    private String title;
    private String description;
    private String category;
    private Integer estimatedTimeMinutes;
    private Integer totalQuestions;
    private List<String> instructions;
    private List<AssessmentTemplate.Question> questions;
}