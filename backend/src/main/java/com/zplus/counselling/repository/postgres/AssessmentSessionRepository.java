package com.zplus.counselling.repository.postgres;

import com.zplus.counselling.entity.postgres.AssessmentSession;
import com.zplus.counselling.entity.postgres.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AssessmentSessionRepository extends JpaRepository<AssessmentSession, UUID> {

    Optional<AssessmentSession> findByUserAndStatusAndTemplateId(User user, AssessmentSession.SessionStatus status, String templateId);

    List<AssessmentSession> findByUserAndStatus(User user, AssessmentSession.SessionStatus status);

    List<AssessmentSession> findByUserOrderByStartedAtDesc(User user);

    @Query("SELECT s FROM AssessmentSession s WHERE s.user.id = :userId AND s.status = :status")
    List<AssessmentSession> findByUserIdAndStatus(@Param("userId") UUID userId, @Param("status") AssessmentSession.SessionStatus status);

    @Query("SELECT s FROM AssessmentSession s WHERE s.status = 'IN_PROGRESS' AND s.startedAt < :expirationTime")
    List<AssessmentSession> findExpiredSessions(@Param("expirationTime") LocalDateTime expirationTime);

    long countByUserAndStatus(User user, AssessmentSession.SessionStatus status);

    boolean existsByUserAndTemplateIdAndStatus(User user, String templateId, AssessmentSession.SessionStatus status);
}