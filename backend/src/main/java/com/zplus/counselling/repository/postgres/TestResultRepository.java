package com.zplus.counselling.repository.postgres;

import com.zplus.counselling.entity.postgres.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, UUID> {
    
    List<TestResult> findByUserIdOrderByCreatedAtDesc(UUID userId);
    
    // Add missing methods for tests
    List<TestResult> findByUserId(UUID userId);
    
    List<TestResult> findByUserIdAndTestType(UUID userId, String testType);
    
    List<TestResult> findByUserIdAndTestTypeOrderByCreatedAtDesc(UUID userId, String testType);
    
    Optional<TestResult> findByUserIdAndTestTypeAndIsCompletedTrue(UUID userId, String testType);
    
    @Query("SELECT tr FROM TestResult tr WHERE tr.user.id = :userId AND tr.isCompleted = true")
    List<TestResult> findCompletedTestsByUserId(@Param("userId") UUID userId);
    
    @Query("SELECT COUNT(tr) FROM TestResult tr WHERE tr.testType = :testType AND tr.isCompleted = true")
    Long countCompletedTestsByType(@Param("testType") String testType);
    
    boolean existsByUserIdAndTestTypeAndIsCompletedTrue(UUID userId, String testType);
}