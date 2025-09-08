package com.zplus.counselling.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAnswerDto {
    private Long id;
    private String questionId;
    private Integer questionNumber;
    private String selectedOptionId;
    private String selectedOptionText;
    private Double scoreValue;
    private Long timeSpentSeconds;
    private Boolean isCorrect;
}