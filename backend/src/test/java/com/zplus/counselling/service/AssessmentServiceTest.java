package com.zplus.counselling.service;

import com.zplus.counselling.entity.mongodb.AssessmentTemplate;
import com.zplus.counselling.repository.mongodb.AssessmentTemplateRepository;
import com.zplus.counselling.service.assessment.AssessmentManagementService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
public class AssessmentServiceTest {

    @Mock
    private AssessmentTemplateRepository assessmentTemplateRepository;

    @InjectMocks
    private AssessmentManagementService assessmentService;

    private AssessmentTemplate mockTemplate;

    @BeforeEach
    void setUp() {
        mockTemplate = new AssessmentTemplate();
        mockTemplate.setId("test-id");
        mockTemplate.setTestType("PERSONALITY");
        mockTemplate.setTitle("Big Five Personality Test");
        mockTemplate.setDescription("Comprehensive personality assessment");
        mockTemplate.setVersion("1.0");
        mockTemplate.setIsActive(true);
        mockTemplate.setTotalQuestions(50);
        mockTemplate.setCreatedAt(LocalDateTime.now());
        mockTemplate.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    void testGetAvailableAssessments() {
        // Given
        List<AssessmentTemplate> mockTemplates = Arrays.asList(mockTemplate);
        when(assessmentTemplateRepository.findByIsActiveTrueOrderByCreatedAtDesc())
            .thenReturn(mockTemplates);

        // When
        List<AssessmentTemplate> result = assessmentService.getAvailableAssessments();

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTestType()).isEqualTo("PERSONALITY");
        verify(assessmentTemplateRepository).findByIsActiveTrueOrderByCreatedAtDesc();
    }

    @Test
    void testGetAssessmentByType() {
        // Given
        when(assessmentTemplateRepository.findByTestTypeAndIsActiveTrue(anyString()))
            .thenReturn(Optional.of(mockTemplate));

        // When
        AssessmentTemplate result = assessmentService.getAssessmentByType("PERSONALITY");

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getTestType()).isEqualTo("PERSONALITY");
        verify(assessmentTemplateRepository).findByTestTypeAndIsActiveTrue("PERSONALITY");
    }

    @Test
    void testGetAssessmentByTypeNotFound() {
        // Given
        when(assessmentTemplateRepository.findByTestTypeAndIsActiveTrue(anyString()))
            .thenReturn(Optional.empty());

        // When & Then
        try {
            assessmentService.getAssessmentByType("NONEXISTENT");
            assert false : "Expected RuntimeException";
        } catch (RuntimeException e) {
            assertThat(e.getMessage()).contains("Assessment not found");
        }
        verify(assessmentTemplateRepository).findByTestTypeAndIsActiveTrue("NONEXISTENT");
    }
}