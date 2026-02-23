package com.zplus.counselling.entity.mongodb;

import jakarta.validation.constraints.Min;
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

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTestType() { return testType; }
    public void setTestType(String testType) { this.testType = testType; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getEstimatedTimeMinutes() { return estimatedTimeMinutes; }
    public void setEstimatedTimeMinutes(Integer estimatedTimeMinutes) { this.estimatedTimeMinutes = estimatedTimeMinutes; }

    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public List<String> getInstructions() { return instructions; }
    public void setInstructions(List<String> instructions) { this.instructions = instructions; }

    public List<Question> getQuestions() { return questions; }
    public void setQuestions(List<Question> questions) { this.questions = questions; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }

    public List<Dimension> getDimensions() { return dimensions; }
    public void setDimensions(List<Dimension> dimensions) { this.dimensions = dimensions; }

    public ScoringAlgorithm getScoringAlgorithm() { return scoringAlgorithm; }
    public void setScoringAlgorithm(ScoringAlgorithm scoringAlgorithm) { this.scoringAlgorithm = scoringAlgorithm; }

    public Map<String, ResultType> getResultTypes() { return resultTypes; }
    public void setResultTypes(Map<String, ResultType> resultTypes) { this.resultTypes = resultTypes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    @Data
    public static class Dimension {
        private String code;
        private String name;
        private String description;

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
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
        private String image;
        @Min(0)
        private Integer timeLimit;
        private String correctAnswer;
        @Min(0)
        private Integer points;

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }

        public List<Option> getOptions() { return options; }
        public void setOptions(List<Option> options) { this.options = options; }

        public String getDimension() { return dimension; }
        public void setDimension(String dimension) { this.dimension = dimension; }

        public Boolean getRequired() { return required; }
        public void setRequired(Boolean required) { this.required = required; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public String getImage() { return image; }
        public void setImage(String image) { this.image = image; }

        public Integer getTimeLimit() { return timeLimit; }
        public void setTimeLimit(Integer timeLimit) { this.timeLimit = timeLimit; }

        public String getCorrectAnswer() { return correctAnswer; }
        public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }

        public Integer getPoints() { return points; }
        public void setPoints(Integer points) { this.points = points; }
    }

    @Data
    public static class Option {
        private String id;
        private String text;
        private Map<String, Integer> weights;

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }

        public Map<String, Integer> getWeights() { return weights; }
        public void setWeights(Map<String, Integer> weights) { this.weights = weights; }
    }

    @Data
    public static class ScoringAlgorithm {
        private String type;
        private String method;
        private Map<String, Integer> thresholds;

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }

        public String getMethod() { return method; }
        public void setMethod(String method) { this.method = method; }

        public Map<String, Integer> getThresholds() { return thresholds; }
        public void setThresholds(Map<String, Integer> thresholds) { this.thresholds = thresholds; }
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

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getNickname() { return nickname; }
        public void setNickname(String nickname) { this.nickname = nickname; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public List<String> getStrengths() { return strengths; }
        public void setStrengths(List<String> strengths) { this.strengths = strengths; }

        public List<String> getWeaknesses() { return weaknesses; }
        public void setWeaknesses(List<String> weaknesses) { this.weaknesses = weaknesses; }

        public List<String> getCareerSuggestions() { return careerSuggestions; }
        public void setCareerSuggestions(List<String> careerSuggestions) { this.careerSuggestions = careerSuggestions; }

        public List<String> getDevelopmentAreas() { return developmentAreas; }
        public void setDevelopmentAreas(List<String> developmentAreas) { this.developmentAreas = developmentAreas; }
    }
}