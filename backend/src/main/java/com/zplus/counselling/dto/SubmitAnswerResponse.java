package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubmitAnswerResponse {
    private Integer currentQuestion;
    private Integer totalQuestions;
    private Double completionPercentage;
    private QuestionDto nextQuestion;
}