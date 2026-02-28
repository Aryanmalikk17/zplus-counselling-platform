package com.zplus.counselling.service;

import com.zplus.counselling.dto.*;
import com.zplus.counselling.entity.mongodb.AssessmentTemplate;
import com.zplus.counselling.entity.postgres.AssessmentSession;
import com.zplus.counselling.entity.postgres.TestResult;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.entity.postgres.UserAnswer;
import com.zplus.counselling.exception.ResourceNotFoundException;
import com.zplus.counselling.exception.BadRequestException;
import com.zplus.counselling.repository.mongodb.AssessmentTemplateRepository;
import com.zplus.counselling.repository.postgres.AssessmentSessionRepository;
import com.zplus.counselling.repository.postgres.TestResultRepository;
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
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AssessmentService {

    private final AssessmentSessionRepository sessionRepository;
    private final UserAnswerRepository answerRepository;
    private final AssessmentTemplateRepository templateRepository;
    private final UserRepository userRepository;
    private final TestResultRepository testResultRepository;

    /**
     * Get assessment template by test type
     */
    @Transactional(readOnly = true)
    public AssessmentTemplate getAssessmentTemplateByType(String testType) {
        return templateRepository.findByTestTypeAndIsActiveTrue(testType)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment template not found for type: " + testType));
    }

    /**
     * Get available assessments for a user — optimized to avoid N+1 queries.
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

        // PERF FIX: Fetch all COMPLETED sessions for the user in ONE query, then build a Set for O(1) lookup.
        List<AssessmentSession> completedSessions = sessionRepository
                .findByUserAndStatus(user, AssessmentSession.SessionStatus.COMPLETED);
        Set<String> completedTemplateIds = completedSessions.stream()
                .map(AssessmentSession::getTemplateId)
                .collect(Collectors.toSet());

        // Also fetch all sessions once for lastAttempt date lookup
        List<AssessmentSession> allUserSessions = sessionRepository.findByUserOrderByStartedAtDesc(user);
        Map<String, LocalDateTime> lastAttemptByTemplate = new HashMap<>();
        for (AssessmentSession session : allUserSessions) {
            lastAttemptByTemplate.putIfAbsent(session.getTemplateId(), session.getStartedAt());
        }

        return templates.stream()
                .map(template -> AvailableAssessmentDto.builder()
                        .testType(template.getTestType())
                        .title(template.getTitle())
                        .description(template.getDescription())
                        .category(template.getCategory())
                        .estimatedTimeMinutes(template.getEstimatedTimeMinutes())
                        .totalQuestions(template.getTotalQuestions())
                        .isCompleted(completedTemplateIds.contains(template.getId()))
                        .lastAttemptDate(lastAttemptByTemplate.get(template.getId()))
                        .price(0.0)
                        .difficulty("BEGINNER")
                        .build())
                .collect(Collectors.toList());
    }

    /**
     * Start a new assessment session for a user
     */
    public StartAssessmentResponse startAssessment(UUID userId, String testType, StartAssessmentRequest request) {
        log.info("Starting assessment {} for user: {}", testType, userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        AssessmentTemplate template = templateRepository.findByTestTypeAndIsActiveTrue(testType)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment template not found for type: " + testType));

        boolean hasActiveSession = sessionRepository.existsByUserAndTemplateIdAndStatus(
                user, template.getId(), AssessmentSession.SessionStatus.IN_PROGRESS);

        if (hasActiveSession) {
            throw new BadRequestException("User already has an active session for this assessment");
        }

        AssessmentSession session = new AssessmentSession();
        session.setUser(user);
        session.setTemplateId(template.getId());
        session.setStatus(AssessmentSession.SessionStatus.IN_PROGRESS);
        session.setStartedAt(LocalDateTime.now());
        session.setCurrentQuestionIndex(0);

        session = sessionRepository.save(session);

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
                .timeLimit(null)
                .instructions(template.getInstructions())
                .firstQuestion(firstQuestion)
                .build();
    }

    /**
     * Submit an answer for a question in an assessment session
     */
    public SubmitAnswerResponse submitAnswer(SubmitAnswerRequest request) {
        log.info("Submitting answer for session {} question {}", request.getSessionId(), request.getQuestionId());

        UUID sessionId = parseSessionId(request.getSessionId());
        AssessmentSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment session not found with id: " + sessionId));

        if (session.getStatus() != AssessmentSession.SessionStatus.IN_PROGRESS) {
            throw new BadRequestException("Cannot submit answer to a session that is not in progress");
        }

        AssessmentTemplate template = templateRepository.findById(session.getTemplateId())
                .orElseThrow(() -> new ResourceNotFoundException("Assessment template not found"));

        UserAnswer answer = new UserAnswer();
        answer.setSession(session);
        answer.setQuestionId(request.getQuestionId());
        answer.setSelectedOptionId(request.getAnswer());
        answer.setQuestionNumber(session.getCurrentQuestionIndex() + 1);
        answer.setTimeSpentSeconds(request.getResponseTime() != null ? request.getResponseTime().longValue() : 0L);

        answerRepository.save(answer);

        int currentQuestionIndex = session.getCurrentQuestionIndex() + 1;
        session.setCurrentQuestionIndex(currentQuestionIndex);
        sessionRepository.save(session);

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

        double completionPercentage = template.getTotalQuestions() > 0
                ? ((double) currentQuestionIndex / template.getTotalQuestions()) * 100
                : 0.0;

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
    public AssessmentResultDto completeAssessment(String sessionIdStr) {
        log.info("Completing assessment session {}", sessionIdStr);

        UUID sessionId = parseSessionId(sessionIdStr);
        AssessmentSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment session not found with id: " + sessionIdStr));

        if (session.getStatus() != AssessmentSession.SessionStatus.IN_PROGRESS) {
            throw new BadRequestException("Cannot complete a session that is not in progress");
        }

        List<UserAnswer> answers = answerRepository.findBySessionOrderByQuestionNumber(session);

        AssessmentTemplate template = templateRepository.findById(session.getTemplateId())
                .orElseThrow(() -> new ResourceNotFoundException("Assessment template not found"));

        Map<String, Integer> scores = calculateScores(answers, template);
        String personalityType = determinePersonalityType(scores, template.getTestType());

        session.setStatus(AssessmentSession.SessionStatus.COMPLETED);
        session.setCompletedAt(LocalDateTime.now());
        sessionRepository.save(session);
        
        TestResult testResult = new TestResult();
        testResult.setUser(session.getUser());
        testResult.setTestType(template.getTestType());
        testResult.setTestVersion(template.getVersion() != null ? template.getVersion() : "1.0");
        testResult.setPersonalityType(personalityType);
        testResult.setRawScores(new HashMap<>(scores));
        testResult.setIsCompleted(true);
        testResult.setCreatedAt(LocalDateTime.now());
        testResult.setUpdatedAt(LocalDateTime.now());
        testResult.setCompletionPercentage(100);
        testResult.setDurationMinutes(session.getTimeSpentSeconds() != null ? (int) (session.getTimeSpentSeconds() / 60) : 0);
        testResultRepository.save(testResult);

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
    public AssessmentResultDto getAssessmentResult(String resultIdStr, UUID userId) {
        UUID sessionId = parseSessionId(resultIdStr);
        AssessmentSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment result not found with id: " + resultIdStr));

        if (!session.getUser().getId().equals(userId)) {
            throw new BadRequestException("User does not have access to this result");
        }

        if (session.getStatus() != AssessmentSession.SessionStatus.COMPLETED) {
            throw new BadRequestException("Assessment is not completed yet");
        }

        AssessmentTemplate template = templateRepository.findById(session.getTemplateId())
                .orElseThrow(() -> new ResourceNotFoundException("Assessment template not found"));

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

    // --- Private helpers ---

    /**
     * Safely parse a session ID string to UUID, throwing a clean error on invalid input.
     */
    private UUID parseSessionId(String sessionIdStr) {
        try {
            return UUID.fromString(sessionIdStr);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid session ID format: " + sessionIdStr);
        }
    }

    private Map<String, Integer> calculateScores(List<UserAnswer> answers, AssessmentTemplate template) {
        Map<String, Integer> scores = new HashMap<>();

        if ("MBTI".equals(template.getTestType())) {
            scores.put("E", 0); scores.put("I", 0);
            scores.put("S", 0); scores.put("N", 0);
            scores.put("T", 0); scores.put("F", 0);
            scores.put("J", 0); scores.put("P", 0);

            if (template.getQuestions() == null) return scores;

            Map<String, AssessmentTemplate.Question> questionMap = template.getQuestions().stream()
                    .collect(Collectors.toMap(AssessmentTemplate.Question::getId, q -> q));

            for (UserAnswer answer : answers) {
                if (answer.getSelectedOptionId() == null) continue;
                
                AssessmentTemplate.Question question = questionMap.get(answer.getQuestionId());
                if (question == null || question.getOptions() == null) continue;

                AssessmentTemplate.Option selectedOption = question.getOptions().stream()
                        .filter(opt -> answer.getSelectedOptionId().equals(opt.getId()))
                        .findFirst()
                        .orElse(null);

                if (selectedOption != null) {
                    if (selectedOption.getWeights() != null && !selectedOption.getWeights().isEmpty()) {
                        selectedOption.getWeights().forEach((dimension, weight) -> {
                            scores.put(dimension, scores.getOrDefault(dimension, 0) + weight);
                        });
                    } else if (question.getDimension() != null) {
                        // Fallback to simple points / dimension based mapping
                        String dim = question.getDimension();
                        Integer points = question.getPoints() != null ? question.getPoints() : 1;
                        scores.put(dim, scores.getOrDefault(dim, 0) + points);
                    }
                }
            }
        }

        return scores;
    }

    private String determinePersonalityType(Map<String, Integer> scores, String testType) {
        if ("MBTI".equals(testType)) {
            StringBuilder type = new StringBuilder();
            // Tie-breakers using INFP defaults (standard MBTI handling)
            type.append(scores.getOrDefault("E", 0) > scores.getOrDefault("I", 0) ? "E" : "I");
            type.append(scores.getOrDefault("S", 0) > scores.getOrDefault("N", 0) ? "S" : "N");
            type.append(scores.getOrDefault("T", 0) > scores.getOrDefault("F", 0) ? "T" : "F");
            type.append(scores.getOrDefault("J", 0) > scores.getOrDefault("P", 0) ? "J" : "P");
            return type.toString();
        }
        return "UNKNOWN";
    }

    private ResultSummaryDto generateResultSummary(String personalityType, String testType) {
        if ("MBTI".equals(testType)) {
            return ResultSummaryDto.builder()
                    .title("Your Personality Type: " + personalityType)
                    .description("Detailed traits for " + personalityType + " will be available in the full report.")
                    .strengths(List.of("Unique strengths for " + personalityType))
                    .careerSuggestions(List.of("Suggested careers for " + personalityType))
                    .build();
        }
        return ResultSummaryDto.builder()
                .title("Assessment Complete")
                .description("Your assessment has been completed successfully.")
                .strengths(List.of("Unique strengths identified"))
                .careerSuggestions(List.of("Various career options available"))
                .build();
    }

    private AssessmentSessionDto convertToDto(AssessmentSession session, AssessmentTemplate template) {
        AssessmentSessionDto dto = new AssessmentSessionDto();
        // ID is now safely represented as a String UUID — no lossy casting.
        dto.setId(session.getId() != null ? session.getId().toString() : null);
        dto.setTemplateId(session.getTemplateId());
        dto.setTemplateTitle(template != null ? template.getTitle() : "Unknown Template");
        dto.setTemplateType(template != null ? template.getTestType() : "Unknown");
        dto.setStatus(session.getStatus().name());
        dto.setCurrentQuestionIndex(session.getCurrentQuestionIndex());
        dto.setTotalQuestions(template != null && template.getQuestions() != null ? template.getQuestions().size() : 0);
        dto.setStartedAt(session.getStartedAt());
        dto.setCompletedAt(session.getCompletedAt());
        dto.setTimeSpentSeconds(session.getTimeSpentSeconds());

        if (dto.getTotalQuestions() != null && dto.getTotalQuestions() > 0 && dto.getCurrentQuestionIndex() != null) {
            dto.setProgressPercentage((double) dto.getCurrentQuestionIndex() / dto.getTotalQuestions() * 100);
        }

        return dto;
    }
}