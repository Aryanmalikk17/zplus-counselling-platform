package com.zplus.counselling.repository.postgres;

import com.zplus.counselling.entity.postgres.CounselingSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface CounselingSessionRepository extends JpaRepository<CounselingSession, UUID> {

    // Find sessions by user
    Page<CounselingSession> findByUserIdOrderByScheduledAtDesc(UUID userId, Pageable pageable);
    
    // Find sessions by counselor
    Page<CounselingSession> findByCounselorIdOrderByScheduledAtDesc(UUID counselorId, Pageable pageable);
    
    // Find sessions by status
    List<CounselingSession> findByStatusOrderByScheduledAtAsc(CounselingSession.SessionStatus status);
    
    // Find upcoming sessions for a user
    @Query("SELECT cs FROM CounselingSession cs WHERE cs.user.id = :userId AND cs.scheduledAt > :now AND cs.status IN :statuses ORDER BY cs.scheduledAt ASC")
    List<CounselingSession> findUpcomingSessionsForUser(@Param("userId") UUID userId, 
                                                        @Param("now") LocalDateTime now,
                                                        @Param("statuses") List<CounselingSession.SessionStatus> statuses);
    
    // Find upcoming sessions for a counselor
    @Query("SELECT cs FROM CounselingSession cs WHERE cs.counselor.id = :counselorId AND cs.scheduledAt > :now AND cs.status IN :statuses ORDER BY cs.scheduledAt ASC")
    List<CounselingSession> findUpcomingSessionsForCounselor(@Param("counselorId") UUID counselorId,
                                                             @Param("now") LocalDateTime now,
                                                             @Param("statuses") List<CounselingSession.SessionStatus> statuses);
    
    // Find sessions in a date range
    @Query("SELECT cs FROM CounselingSession cs WHERE cs.scheduledAt BETWEEN :startDate AND :endDate ORDER BY cs.scheduledAt ASC")
    List<CounselingSession> findSessionsInDateRange(@Param("startDate") LocalDateTime startDate,
                                                    @Param("endDate") LocalDateTime endDate);
    
    // Count sessions by status for a user
    @Query("SELECT COUNT(cs) FROM CounselingSession cs WHERE cs.user.id = :userId AND cs.status = :status")
    Long countSessionsByUserAndStatus(@Param("userId") UUID userId, @Param("status") CounselingSession.SessionStatus status);
    
    // Find sessions that need follow-up (completed sessions without feedback)
    @Query("SELECT cs FROM CounselingSession cs WHERE cs.status = 'COMPLETED' AND (cs.clientFeedback IS NULL OR cs.counselorFeedback IS NULL)")
    List<CounselingSession> findSessionsNeedingFollowup();
    
    // Check for scheduling conflicts
    @Query("SELECT cs FROM CounselingSession cs WHERE cs.counselor.id = :counselorId AND cs.scheduledAt BETWEEN :startTime AND :endTime AND cs.status NOT IN ('CANCELLED', 'NO_SHOW')")
    List<CounselingSession> findConflictingSessions(@Param("counselorId") UUID counselorId,
                                                   @Param("startTime") LocalDateTime startTime,
                                                   @Param("endTime") LocalDateTime endTime);
}