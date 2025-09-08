package com.zplus.counselling.service.assessment;

import com.zplus.counselling.entity.mongodb.AssessmentTemplate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ScoringService {

    public Map<String, Object> calculateScores(Map<String, Object> answers, AssessmentTemplate template) {
        Map<String, Object> scores = new HashMap<>();
        
        if (template.getTestType().equals("MBTI")) {
            return calculateMBTIScores(answers, template);
        } else if (template.getTestType().equals("BIG_FIVE")) {
            return calculateBigFiveScores(answers, template);
        } else if (template.getTestType().equals("CAREER")) {
            return calculateCareerScores(answers, template);
        }
        
        return scores;
    }

    public Map<String, Object> generateResults(Map<String, Object> scores, AssessmentTemplate template) {
        Map<String, Object> results = new HashMap<>();
        
        if (template.getTestType().equals("MBTI")) {
            return generateMBTIResults(scores, template);
        } else if (template.getTestType().equals("BIG_FIVE")) {
            return generateBigFiveResults(scores, template);
        } else if (template.getTestType().equals("CAREER")) {
            return generateCareerResults(scores, template);
        }
        
        return results;
    }

    private Map<String, Object> calculateMBTIScores(Map<String, Object> answers, AssessmentTemplate template) {
        Map<String, Object> scores = new HashMap<>();
        Map<String, Integer> dimensionScores = new HashMap<>();
        
        // Initialize dimension scores
        dimensionScores.put("E", 0);
        dimensionScores.put("I", 0);
        dimensionScores.put("S", 0);
        dimensionScores.put("N", 0);
        dimensionScores.put("T", 0);
        dimensionScores.put("F", 0);
        dimensionScores.put("J", 0);
        dimensionScores.put("P", 0);

        // Calculate scores based on answers and question weights
        for (AssessmentTemplate.Question question : template.getQuestions()) {
            String questionId = question.getId();
            String answerId = (String) answers.get(questionId);
            
            if (answerId != null) {
                for (AssessmentTemplate.Option option : question.getOptions()) {
                    if (option.getId().equals(answerId)) {
                        Map<String, Integer> weights = option.getWeights();
                        for (Map.Entry<String, Integer> weight : weights.entrySet()) {
                            dimensionScores.merge(weight.getKey(), weight.getValue(), Integer::sum);
                        }
                        break;
                    }
                }
            }
        }

        scores.put("dimensionScores", dimensionScores);
        return scores;
    }

    private Map<String, Object> generateMBTIResults(Map<String, Object> scores, AssessmentTemplate template) {
        Map<String, Object> results = new HashMap<>();
        @SuppressWarnings("unchecked")
        Map<String, Integer> dimensionScores = (Map<String, Integer>) scores.get("dimensionScores");

        // Determine personality type
        StringBuilder personalityType = new StringBuilder();
        personalityType.append(dimensionScores.get("E") > dimensionScores.get("I") ? "E" : "I");
        personalityType.append(dimensionScores.get("S") > dimensionScores.get("N") ? "S" : "N");
        personalityType.append(dimensionScores.get("T") > dimensionScores.get("F") ? "T" : "F");
        personalityType.append(dimensionScores.get("J") > dimensionScores.get("P") ? "J" : "P");

        String typeCode = personalityType.toString();
        results.put("personalityType", typeCode);

        // Get result details from template
        AssessmentTemplate.ResultType resultType = template.getResultTypes().get(typeCode);
        if (resultType != null) {
            results.put("title", resultType.getTitle());
            results.put("description", resultType.getDescription());
            results.put("strengths", resultType.getStrengths());
            results.put("weaknesses", resultType.getWeaknesses());
            results.put("careerSuggestions", resultType.getCareerSuggestions());
            results.put("primaryTraits", List.of(typeCode.split("")));
        }

        return results;
    }

    private Map<String, Object> calculateBigFiveScores(Map<String, Object> answers, AssessmentTemplate template) {
        Map<String, Object> scores = new HashMap<>();
        Map<String, Integer> traitScores = new HashMap<>();
        
        // Initialize Big Five trait scores
        traitScores.put("OPENNESS", 0);
        traitScores.put("CONSCIENTIOUSNESS", 0);
        traitScores.put("EXTRAVERSION", 0);
        traitScores.put("AGREEABLENESS", 0);
        traitScores.put("NEUROTICISM", 0);

        // Calculate trait scores based on answers
        for (AssessmentTemplate.Question question : template.getQuestions()) {
            String questionId = question.getId();
            Integer answerValue = (Integer) answers.get(questionId);
            
            if (answerValue != null) {
                String dimension = question.getDimension();
                traitScores.merge(dimension, answerValue, Integer::sum);
            }
        }

        scores.put("traitScores", traitScores);
        return scores;
    }

    private Map<String, Object> generateBigFiveResults(Map<String, Object> scores, AssessmentTemplate template) {
        Map<String, Object> results = new HashMap<>();
        @SuppressWarnings("unchecked")
        Map<String, Integer> traitScores = (Map<String, Integer>) scores.get("traitScores");

        // Convert raw scores to percentiles (simplified)
        Map<String, Integer> percentiles = new HashMap<>();
        for (Map.Entry<String, Integer> entry : traitScores.entrySet()) {
            int percentile = Math.min(100, Math.max(0, (entry.getValue() * 10))); // Simplified calculation
            percentiles.put(entry.getKey(), percentile);
        }

        results.put("traitPercentiles", percentiles);
        
        // Determine primary traits (high scoring traits)
        List<String> primaryTraits = percentiles.entrySet().stream()
            .filter(entry -> entry.getValue() >= 70)
            .map(Map.Entry::getKey)
            .toList();
        
        results.put("primaryTraits", primaryTraits);

        return results;
    }

    private Map<String, Object> calculateCareerScores(Map<String, Object> answers, AssessmentTemplate template) {
        Map<String, Object> scores = new HashMap<>();
        Map<String, Integer> interestScores = new HashMap<>();
        
        // Initialize career interest scores
        interestScores.put("TECHNOLOGY", 0);
        interestScores.put("HEALTHCARE", 0);
        interestScores.put("BUSINESS", 0);
        interestScores.put("CREATIVE", 0);
        interestScores.put("SOCIAL", 0);
        interestScores.put("ANALYTICAL", 0);

        // Calculate interest scores
        for (AssessmentTemplate.Question question : template.getQuestions()) {
            String questionId = question.getId();
            String answerId = (String) answers.get(questionId);
            
            if (answerId != null) {
                for (AssessmentTemplate.Option option : question.getOptions()) {
                    if (option.getId().equals(answerId)) {
                        Map<String, Integer> weights = option.getWeights();
                        for (Map.Entry<String, Integer> weight : weights.entrySet()) {
                            interestScores.merge(weight.getKey(), weight.getValue(), Integer::sum);
                        }
                        break;
                    }
                }
            }
        }

        scores.put("interestScores", interestScores);
        return scores;
    }

    private Map<String, Object> generateCareerResults(Map<String, Object> scores, AssessmentTemplate template) {
        Map<String, Object> results = new HashMap<>();
        @SuppressWarnings("unchecked")
        Map<String, Integer> interestScores = (Map<String, Integer>) scores.get("interestScores");

        // Find top career interests
        List<String> topInterests = interestScores.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .limit(3)
            .map(Map.Entry::getKey)
            .toList();

        results.put("topInterests", topInterests);
        results.put("interestScores", interestScores);

        // Generate career suggestions based on top interests
        List<String> careerSuggestions = generateCareerSuggestions(topInterests);
        results.put("careerSuggestions", careerSuggestions);

        return results;
    }

    private List<String> generateCareerSuggestions(List<String> topInterests) {
        // This would typically be more sophisticated, possibly using ML or a comprehensive database
        Map<String, List<String>> careerMapping = Map.of(
            "TECHNOLOGY", List.of("Software Engineer", "Data Scientist", "Cybersecurity Analyst", "AI Researcher"),
            "HEALTHCARE", List.of("Doctor", "Nurse", "Physical Therapist", "Medical Researcher"),
            "BUSINESS", List.of("Management Consultant", "Business Analyst", "Marketing Manager", "Entrepreneur"),
            "CREATIVE", List.of("Graphic Designer", "Writer", "Artist", "Architect"),
            "SOCIAL", List.of("Social Worker", "Teacher", "Counselor", "Human Resources"),
            "ANALYTICAL", List.of("Research Analyst", "Financial Analyst", "Statistician", "Operations Research Analyst")
        );

        return topInterests.stream()
            .flatMap(interest -> careerMapping.getOrDefault(interest, List.of()).stream())
            .distinct()
            .limit(10)
            .toList();
    }
}