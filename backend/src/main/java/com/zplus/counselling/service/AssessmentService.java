package com.zplus.counselling.service;

import com.zplus.counselling.dto.*;
import com.zplus.counselling.entity.mongodb.AssessmentTemplate;
import com.zplus.counselling.entity.postgres.AssessmentSession;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.entity.postgres.UserAnswer;
import com.zplus.counselling.exception.ResourceNotFoundException;
import com.zplus.counselling.exception.BadRequestException;
import com.zplus.counselling.repository.mongodb.AssessmentTemplateRepository;
import com.zplus.counselling.repository.postgres.AssessmentSessionRepository;
import com.zplus.counselling.repository.postgres.UserAnswerRepository;
import com.zplus.counselling.repository.postgres.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AssessmentService {

    private final AssessmentSessionRepository sessionRepository;
    private final UserAnswerRepository answerRepository;
    private final AssessmentTemplateRepository templateRepository;
    private final UserRepository userRepository;

    /**
     * Get available assessments for a user
     */
    @Transactional(readOnly = true)
    public List<AvailableAssessmentDto> getAvailableAssessments(UUID userId) {
        log.info("Getting available assessments for user: {}", userId);

        List<AssessmentTemplate> templates = templateRepository.findAll()
                .stream()
                .filter(template -> template.getIsActive() != null && template.getIsActive())
                .collect(Collectors.toList());
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        return templates.stream()
                .map(template -> {
                    // Check if user has completed this assessment
                    boolean isCompleted = sessionRepository.existsByUserAndTemplateIdAndStatus(
                            user, template.getId(), AssessmentSession.SessionStatus.COMPLETED);
                    
                    // Get last attempt date (simplified)
                    LocalDateTime lastAttempt = sessionRepository.findByUserOrderByStartedAtDesc(user)
                            .stream()
                            .filter(session -> template.getId().equals(session.getTemplateId()))
                            .map(AssessmentSession::getStartedAt)
                            .max(LocalDateTime::compareTo)
                            .orElse(null);
                    
                    return AvailableAssessmentDto.builder()
                            .testType(template.getTestType())
                            .title(template.getTitle())
                            .description(template.getDescription())
                            .category(template.getCategory())
                            .estimatedTimeMinutes(template.getEstimatedTimeMinutes())
                            .totalQuestions(template.getTotalQuestions())
                            .isCompleted(isCompleted)
                            .lastAttemptDate(lastAttempt)
                            .price(0.0) // Default price
                            .difficulty("BEGINNER") // Default difficulty
                            .build();
                })
                .collect(Collectors.toList());
    }

    /**
     * Start a new assessment session for a user
     */
    public StartAssessmentResponse startAssessment(UUID userId, String testType, StartAssessmentRequest request) {
        log.info("Starting assessment {} for user: {}", testType, userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // Find template by test type
        AssessmentTemplate template = templateRepository.findAll()
                .stream()
                .filter(t -> testType.equals(t.getTestType()) && Boolean.TRUE.equals(t.getIsActive()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Assessment template not found for type: " + testType));

        // Check if user already has an active session for this template
        boolean hasActiveSession = sessionRepository.existsByUserAndTemplateIdAndStatus(
                user, template.getId(), AssessmentSession.SessionStatus.IN_PROGRESS);
                
        if (hasActiveSession) {
            throw new BadRequestException("User already has an active session for this assessment");
        }

        // Create new session
        AssessmentSession session = new AssessmentSession();
        session.setUser(user);
        session.setTemplateId(template.getId());
        session.setStatus(AssessmentSession.SessionStatus.IN_PROGRESS);
        session.setStartedAt(LocalDateTime.now());
        session.setCurrentQuestionIndex(0);

        session = sessionRepository.save(session);

        // Get first question
        QuestionDto firstQuestion = null;
        if (template.getQuestions() != null && !template.getQuestions().isEmpty()) {
            var question = template.getQuestions().get(0);
            firstQuestion = QuestionDto.builder()
                    .id(question.getId())
                    .text(question.getText())
                    .type(question.getType())
                    .options(question.getOptions() != null ? question.getOptions().stream()
                            .map(opt -> OptionDto.builder()
                                    .id(opt.getId())
                                    .text(opt.getText())
                                    .build())
                            .collect(Collectors.toList()) : List.of())
                    .required(true)
                    .build();
        }

        return StartAssessmentResponse.builder()
                .sessionId(session.getId().toString())
                .testType(template.getTestType())
                .totalQuestions(template.getTotalQuestions())
                .currentQuestion(1)
                .timeLimit(null) // Default no time limit
                .instructions(template.getInstructions())
                .firstQuestion(firstQuestion)
                .build();
    }

    /**
     * Submit an answer for a question in an assessment session
     */
    public SubmitAnswerResponse submitAnswer(SubmitAnswerRequest request) {
        log.info("Submitting answer for session {} question {}", request.getSessionId(), request.getQuestionId());

        Long sessionId = Long.parseLong(request.getSessionId());
        AssessmentSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment session not found with id: " + sessionId));

        if (session.getStatus() != AssessmentSession.SessionStatus.IN_PROGRESS) {
            throw new BadRequestException("Cannot submit answer to a session that is not in progress");
        }

        // Get template to access questions
        AssessmentTemplate template = templateRepository.findById(session.getTemplateId())
                .orElseThrow(() -> new ResourceNotFoundException("Assessment template not found"));

        // Save the answer
        UserAnswer answer = new UserAnswer();
        answer.setSession(session);
        answer.setQuestionId(request.getQuestionId());
        answer.setSelectedOptionId(request.getAnswer());
        answer.setTimeSpentSeconds(request.getResponseTime() != null ? request.getResponseTime().longValue() : 0L);
        
        answerRepository.save(answer);

        // Update session progress
        int currentQuestionIndex = session.getCurrentQuestionIndex() + 1;
        session.setCurrentQuestionIndex(currentQuestionIndex);
        sessionRepository.save(session);

        // Get next question if available
        QuestionDto nextQuestion = null;
        if (template.getQuestions() != null && currentQuestionIndex < template.getQuestions().size()) {
            var question = template.getQuestions().get(currentQuestionIndex);
            nextQuestion = QuestionDto.builder()
                    .id(question.getId())
                    .text(question.getText())
                    .type(question.getType())
                    .options(question.getOptions() != null ? question.getOptions().stream()
                            .map(opt -> OptionDto.builder()
                                    .id(opt.getId())
                                    .text(opt.getText())
                                    .build())
                            .collect(Collectors.toList()) : List.of())
                    .required(true)
                    .build();
        }

        double completionPercentage = ((double) currentQuestionIndex / template.getTotalQuestions()) * 100;

        return SubmitAnswerResponse.builder()
                .currentQuestion(currentQuestionIndex + 1)
                .totalQuestions(template.getTotalQuestions())
                .completionPercentage(completionPercentage)
                .nextQuestion(nextQuestion)
                .build();
    }

    /**
     * Complete an assessment and calculate results
     */
    public AssessmentResultDto completeAssessment(String sessionId) {
        log.info("Completing assessment session {}", sessionId);

        Long sessionIdLong = Long.parseLong(sessionId);
        AssessmentSession session = sessionRepository.findById(sessionIdLong)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment session not found with id: " + sessionId));

        if (session.getStatus() != AssessmentSession.SessionStatus.IN_PROGRESS) {
            throw new BadRequestException("Cannot complete a session that is not in progress");
        }

        // Get all answers for this session
        List<UserAnswer> answers = answerRepository.findBySessionOrderByQuestionNumber(session);
        
        // Get template for scoring
        AssessmentTemplate template = templateRepository.findById(session.getTemplateId())
                .orElseThrow(() -> new ResourceNotFoundException("Assessment template not found"));

        // Calculate scores and personality type (simplified for now)
        Map<String, Integer> scores = calculateScores(answers, template);
        String personalityType = determinePersonalityType(scores, template.getTestType());

        // Complete the session
        session.setStatus(AssessmentSession.SessionStatus.COMPLETED);
        session.setCompletedAt(LocalDateTime.now());
        sessionRepository.save(session);

        // Generate result summary
        ResultSummaryDto summary = generateResultSummary(personalityType, template.getTestType());

        return AssessmentResultDto.builder()
                .resultId(session.getId().toString())
                .personalityType(personalityType)
                .scores(scores)
                .summary(summary)
                .reportUrl("/api/v1/reports/download/" + session.getId())
                .completedAt(session.getCompletedAt())
                .build();
    }

    /**
     * Get assessment result by ID
     */
    @Transactional(readOnly = true)
    public AssessmentResultDto getAssessmentResult(String resultId, UUID userId) {
        Long sessionId = Long.parseLong(resultId);
        AssessmentSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment result not found with id: " + resultId));

        // Verify user owns this result
        if (!session.getUser().getId().equals(userId)) {
            throw new BadRequestException("User does not have access to this result");
        }

        if (session.getStatus() != AssessmentSession.SessionStatus.COMPLETED) {
            throw new BadRequestException("Assessment is not completed yet");
        }

        // Get template for context
        AssessmentTemplate template = templateRepository.findById(session.getTemplateId())
                .orElseThrow(() -> new ResourceNotFoundException("Assessment template not found"));

        // Get answers and recalculate scores (or retrieve from stored results)
        List<UserAnswer> answers = answerRepository.findBySessionOrderByQuestionNumber(session);
        Map<String, Integer> scores = calculateScores(answers, template);
        String personalityType = determinePersonalityType(scores, template.getTestType());
        ResultSummaryDto summary = generateResultSummary(personalityType, template.getTestType());

        return AssessmentResultDto.builder()
                .resultId(session.getId().toString())
                .personalityType(personalityType)
                .scores(scores)
                .summary(summary)
                .reportUrl("/api/v1/reports/download/" + session.getId())
                .completedAt(session.getCompletedAt())
                .build();
    }

    @Transactional(readOnly = true)
    public AssessmentSessionDto getCurrentSession(UUID userId, String templateId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Optional<AssessmentSession> sessionOpt = sessionRepository.findByUserAndStatusAndTemplateId(
                user, AssessmentSession.SessionStatus.IN_PROGRESS, templateId);

        if (sessionOpt.isEmpty()) {
            throw new ResourceNotFoundException("No active session found for this assessment");
        }

        AssessmentTemplate template = templateRepository.findById(templateId)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment template not found"));

        return convertToDto(sessionOpt.get(), template);
    }

    @Transactional(readOnly = true)
    public List<AssessmentSessionDto> getUserAssessmentHistory(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        List<AssessmentSession> sessions = sessionRepository.findByUserOrderByStartedAtDesc(user);

        return sessions.stream()
                .map(session -> {
                    AssessmentTemplate template = templateRepository.findById(session.getTemplateId())
                            .orElse(null);
                    return convertToDto(session, template);
                })
                .collect(Collectors.toList());
    }

    private Map<String, Integer> calculateScores(List<UserAnswer> answers, AssessmentTemplate template) {
        // Simplified scoring logic - implement proper scoring based on template type
        Map<String, Integer> scores = new HashMap<>();
        
        if ("MBTI".equals(template.getTestType())) {
            scores.put("E", 45); scores.put("I", 55);
            scores.put("S", 40); scores.put("N", 60);
            scores.put("T", 70); scores.put("F", 30);
            scores.put("J", 65); scores.put("P", 35);
        }
        
        return scores;
    }

    private String determinePersonalityType(Map<String, Integer> scores, String testType) {
        if ("MBTI".equals(testType)) {
            StringBuilder type = new StringBuilder();
            type.append(scores.get("E") > scores.get("I") ? "E" : "I");
            type.append(scores.get("S") > scores.get("N") ? "S" : "N");
            type.append(scores.get("T") > scores.get("F") ? "T" : "F");
            type.append(scores.get("J") > scores.get("P") ? "J" : "P");
            return type.toString();
        }
        return "UNKNOWN";
    }

    private ResultSummaryDto generateResultSummary(String personalityType, String testType) {
        if ("INTJ".equals(personalityType)) {
            return ResultSummaryDto.builder()
                    .title("The Architect")
                    .description("Imaginative and strategic thinkers, with a plan for everything.")
                    .strengths(List.of("Strategic thinking", "Independence", "Determination"))
                    .careerSuggestions(List.of("Software Engineer", "Scientist", "Architect", "Researcher"))
                    .build();
        }
        // Add more personality types as needed
        return ResultSummaryDto.builder()
                .title("Assessment Complete")
                .description("Your assessment has been completed successfully.")
                .strengths(List.of("Unique strengths identified"))
                .careerSuggestions(List.of("Various career options available"))
                .build();
    }

    private AssessmentSessionDto convertToDto(AssessmentSession session, AssessmentTemplate template) {
        AssessmentSessionDto dto = new AssessmentSessionDto();
        // Convert UUID to Long - this assumes the session ID can be converted to Long
        // If your AssessmentSession uses UUID but DTO expects Long, you may need to adjust the DTO
        dto.setId(session.getId() != null ? Long.parseLong(session.getId().toString().replace("-", "").substring(0, 18)) : null);
        dto.setTemplateId(session.getTemplateId());
        dto.setTemplateTitle(template != null ? template.getTitle() : "Unknown Template");
        dto.setTemplateType(template != null ? template.getTestType() : "Unknown");
        dto.setStatus(session.getStatus().name());
        dto.setCurrentQuestionIndex(session.getCurrentQuestionIndex());
        dto.setTotalQuestions(template != null && template.getQuestions() != null ? template.getQuestions().size() : 0);
        dto.setStartedAt(session.getStartedAt());
        dto.setCompletedAt(session.getCompletedAt());
        dto.setTimeSpentSeconds(session.getTimeSpentSeconds());

        // Calculate progress percentage
        if (dto.getTotalQuestions() > 0) {
            dto.setProgressPercentage((double) dto.getCurrentQuestionIndex() / dto.getTotalQuestions() * 100);
        }

        return dto;
    }
}