package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StartAssessmentResponse {
    private String sessionId;
    private String testType;
    private Integer totalQuestions;
    private Integer currentQuestion;
    private Integer timeLimit;
    private List<String> instructions;
    private QuestionDto firstQuestion;
}