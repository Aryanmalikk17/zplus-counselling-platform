package com.zplus.counselling.repository.mongodb;

import com.zplus.counselling.entity.mongodb.AssessmentTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssessmentTemplateRepository extends MongoRepository<AssessmentTemplate, String> {
    
    Optional<AssessmentTemplate> findByTestTypeAndIsActiveTrue(String testType);
    
    List<AssessmentTemplate> findByIsActiveTrueOrderByCreatedAtDesc();
    
    List<AssessmentTemplate> findByCategoryAndIsActiveTrueOrderByCreatedAtDesc(String category);
    
    Optional<AssessmentTemplate> findByTestTypeAndVersionAndIsActiveTrue(String testType, String version);
    
    boolean existsByTestTypeAndIsActiveTrue(String testType);
}