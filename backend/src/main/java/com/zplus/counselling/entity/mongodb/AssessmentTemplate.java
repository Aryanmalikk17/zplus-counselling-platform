package com.zplus.counselling.entity.mongodb;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "assessment_templates")
@Data
public class AssessmentTemplate {

    @Id
    private String id;
    
    private String testType;
    private String version;
    private String title;
    private String description;
    private String category;
    private Integer estimatedTimeMinutes;
    private Integer totalQuestions;
    private Boolean isActive;
    private List<String> instructions;
    private List<Dimension> dimensions;
    private List<Question> questions;
    private ScoringAlgorithm scoringAlgorithm;
    private Map<String, ResultType> resultTypes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    public static class Dimension {
        private String code;
        private String name;
        private String description;
    }

    @Data
    public static class Question {
        private String id;
        private String text;
        private String type;
        private List<Option> options;
        private String dimension;
        private Boolean required;
        private String category;
    }

    @Data
    public static class Option {
        private String id;
        private String text;
        private Map<String, Integer> weights;
    }

    @Data
    public static class ScoringAlgorithm {
        private String type;
        private String method;
        private Map<String, Integer> thresholds;
    }

    @Data
    public static class ResultType {
        private String title;
        private String nickname;
        private String description;
        private List<String> strengths;
        private List<String> weaknesses;
        private List<String> careerSuggestions;
        private List<String> developmentAreas;
    }
}