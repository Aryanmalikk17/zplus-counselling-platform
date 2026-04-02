package com.zplus.counselling.service;

import com.zplus.counselling.dto.AssessmentResultDto;
import com.zplus.counselling.entity.mongodb.AssessmentTemplate;
import com.zplus.counselling.entity.postgres.AssessmentSession;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.entity.postgres.UserAnswer;
import com.zplus.counselling.repository.mongodb.AssessmentTemplateRepository;
import com.zplus.counselling.repository.postgres.AssessmentSessionRepository;
import com.zplus.counselling.repository.postgres.TestResultRepository;
import com.zplus.counselling.repository.postgres.UserAnswerRepository;
import com.zplus.counselling.repository.postgres.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AssessmentServiceTest {

    @Mock
    private AssessmentSessionRepository sessionRepository;
    @Mock
    private UserAnswerRepository answerRepository;
    @Mock
    private AssessmentTemplateRepository templateRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private TestResultRepository testResultRepository;

    @InjectMocks
    private AssessmentService assessmentService;

    private User mockUser;
    private AssessmentSession mockSession;
    private AssessmentTemplate personalityTemplate;
    private AssessmentTemplate aptitudeTemplate;

    @BeforeEach
    void setUp() {
        UUID userId = UUID.randomUUID();
        mockUser = new User();
        mockUser.setId(userId);
        mockUser.setEmail("test@example.com");

        UUID sessionId = UUID.randomUUID();
        mockSession = new AssessmentSession();
        mockSession.setId(sessionId);
        mockSession.setUser(mockUser);
        mockSession.setStatus(AssessmentSession.SessionStatus.IN_PROGRESS);
        mockSession.setTemplateId("template-123");
        mockSession.setCurrentQuestionIndex(0);

        // MBTI Template
        personalityTemplate = new AssessmentTemplate();
        personalityTemplate.setId("mbti-123");
        personalityTemplate.setTestType("MBTI");
        personalityTemplate.setCategory("Psychometric");
        
        AssessmentTemplate.Question q1 = new AssessmentTemplate.Question();
        q1.setId("q1");
        q1.setText("Question 1");
        
        AssessmentTemplate.Option o1 = new AssessmentTemplate.Option();
        o1.setId("o1");
        o1.setText("Extraversion Answer");
        o1.setWeights(Map.of("E", 1));
        
        q1.setOptions(List.of(o1));
        personalityTemplate.setQuestions(List.of(q1));

        // Aptitude Template
        aptitudeTemplate = new AssessmentTemplate();
        aptitudeTemplate.setId("apt-123");
        aptitudeTemplate.setTestType("GENERAL_APTITUDE");
        aptitudeTemplate.setCategory("Aptitude");
        aptitudeTemplate.setTotalQuestions(1);
        
        AssessmentTemplate.Question aq1 = new AssessmentTemplate.Question();
        aq1.setId("aq1");
        aq1.setText("What is 2+2?");
        aq1.setPoints(5);
        
        AssessmentTemplate.Option ao1 = new AssessmentTemplate.Option();
        ao1.setId("ao1");
        ao1.setText("4");
        ao1.setWeights(Map.of("Aptitude_Score", 1)); // Correct answer
        
        aq1.setOptions(List.of(ao1));
        aptitudeTemplate.setQuestions(List.of(aq1));
    }

    @Test
    void testCompletePsychometricAssessment() {
        // Given
        UUID sessionId = mockSession.getId();
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(mockSession));
        when(templateRepository.findById(mockSession.getTemplateId())).thenReturn(Optional.of(personalityTemplate));
        
        UserAnswer answer = new UserAnswer();
        answer.setQuestionId("q1");
        answer.setSelectedOptionId("o1");
        when(answerRepository.findBySessionOrderByQuestionNumber(any())).thenReturn(List.of(answer));

        // When
        AssessmentResultDto result = assessmentService.completeAssessment(sessionId.toString());

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getIsAptitudeTest()).isFalse();
        assertThat(result.getScores().get("E")).isEqualTo(1);
        assertThat(result.getPersonalityType()).contains("E");
        verify(testResultRepository, times(1)).save(any());
    }

    @Test
    void testCompleteAptitudeAssessment() {
        // Given
        UUID sessionId = mockSession.getId();
        mockSession.setTemplateId("apt-123");
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(mockSession));
        when(templateRepository.findById("apt-123")).thenReturn(Optional.of(aptitudeTemplate));
        
        UserAnswer answer = new UserAnswer();
        answer.setQuestionId("aq1");
        answer.setSelectedOptionId("ao1");
        when(answerRepository.findBySessionOrderByQuestionNumber(any())).thenReturn(List.of(answer));

        // When
        AssessmentResultDto result = assessmentService.completeAssessment(sessionId.toString());

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getIsAptitudeTest()).isTrue();
        assertThat(result.getAptitudeScore()).isEqualTo(1);
        assertThat(result.getMaxScore()).isEqualTo(5); // Points from question
        assertThat(result.getPersonalityType()).isEqualTo("N/A");
        verify(testResultRepository, times(1)).save(any());
    }
}