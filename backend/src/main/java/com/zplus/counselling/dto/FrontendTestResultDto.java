package com.zplus.counselling.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class FrontendTestResultDto {
    private String testId;
    private String testName;
    private String testType; // Added explicitly
    private Integer score;
    private Integer percentage;
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Integer incorrectAnswers;
    private Integer unanswered;
    private Integer totalPoints;
    private Integer pointsEarned;
    private List<Map<String, Object>> categoryResults;
    private Integer timeSpent;
    private List<String> recommendations;
    private List<String> strengths;
    private List<String> weaknesses;
    private String grade;
    private Boolean isPassed;
    private List<Map<String, Object>> detailedAnswers;
}
