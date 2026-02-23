package com.zplus.counselling.controller;

import com.zplus.counselling.dto.response.ApiResponse;
import com.zplus.counselling.entity.mongodb.AssessmentTemplate;
import com.zplus.counselling.repository.mongodb.AssessmentTemplateRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/admin/assessments")
@RequiredArgsConstructor
@Tag(name = "Admin Assessment Management", description = "Admin endpoints for managing assessment templates")
@PreAuthorize("hasRole('ADMIN')")
public class AdminAssessmentController {

    private final AssessmentTemplateRepository assessmentTemplateRepository;

    @PostMapping
    @Operation(summary = "Create a new assessment template")
    public ResponseEntity<ApiResponse<AssessmentTemplate>> createAssessment(@RequestBody AssessmentTemplate template) {
        template.setCreatedAt(LocalDateTime.now());
        template.setUpdatedAt(LocalDateTime.now());
        AssessmentTemplate savedTemplate = assessmentTemplateRepository.save(template);
        return ResponseEntity.ok(ApiResponse.success(savedTemplate, "Assessment template created successfully"));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing assessment template")
    public ResponseEntity<ApiResponse<AssessmentTemplate>> updateAssessment(
            @PathVariable String id,
            @RequestBody AssessmentTemplate template) {
        
        return assessmentTemplateRepository.findById(id)
                .map(existingTemplate -> {
                    template.setId(id);
                    template.setCreatedAt(existingTemplate.getCreatedAt()); // Preserve original creation date
                    template.setUpdatedAt(LocalDateTime.now());
                    AssessmentTemplate updatedTemplate = assessmentTemplateRepository.save(template);
                    return ResponseEntity.ok(ApiResponse.success(updatedTemplate, "Assessment template updated successfully"));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an assessment template")
    public ResponseEntity<ApiResponse<Void>> deleteAssessment(@PathVariable String id) {
        if (assessmentTemplateRepository.existsById(id)) {
            assessmentTemplateRepository.deleteById(id);
            return ResponseEntity.ok(ApiResponse.success(null, "Assessment template deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    @Operation(summary = "List all assessment templates")
    public ResponseEntity<ApiResponse<List<AssessmentTemplate>>> getAllAssessments() {
        List<AssessmentTemplate> templates = assessmentTemplateRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success(templates));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get assessment template by ID")
    public ResponseEntity<ApiResponse<AssessmentTemplate>> getAssessmentById(@PathVariable String id) {
        return assessmentTemplateRepository.findById(id)
                .map(template -> ResponseEntity.ok(ApiResponse.success(template)))
                .orElse(ResponseEntity.notFound().build());
    }
}
