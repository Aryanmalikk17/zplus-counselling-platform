package com.zplus.counselling.repository.postgres;

import com.zplus.counselling.entity.postgres.AssessmentSession;
import com.zplus.counselling.entity.postgres.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {

    List<UserAnswer> findBySessionOrderByQuestionNumber(AssessmentSession session);

    Optional<UserAnswer> findBySessionAndQuestionId(AssessmentSession session, String questionId);

    Optional<UserAnswer> findBySessionAndQuestionNumber(AssessmentSession session, Integer questionNumber);

    @Query("SELECT ua FROM UserAnswer ua WHERE ua.session.id = :sessionId ORDER BY ua.questionNumber")
    List<UserAnswer> findBySessionIdOrderByQuestionNumber(@Param("sessionId") Long sessionId);

    @Query("SELECT COUNT(ua) FROM UserAnswer ua WHERE ua.session = :session")
    long countBySession(@Param("session") AssessmentSession session);

    @Query("SELECT AVG(ua.scoreValue) FROM UserAnswer ua WHERE ua.session = :session AND ua.scoreValue IS NOT NULL")
    Double getAverageScoreBySession(@Param("session") AssessmentSession session);

    @Query("SELECT SUM(ua.scoreValue) FROM UserAnswer ua WHERE ua.session = :session AND ua.scoreValue IS NOT NULL")
    Double getTotalScoreBySession(@Param("session") AssessmentSession session);

    void deleteBySession(AssessmentSession session);
}