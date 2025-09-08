package com.zplus.counselling.service;

import com.zplus.counselling.dto.request.CounselingSessionRequest;
import com.zplus.counselling.dto.response.CounselingSessionResponse;
import com.zplus.counselling.entity.postgres.CounselingSession;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.exception.ResourceNotFoundException;
import com.zplus.counselling.repository.postgres.CounselingSessionRepository;
import com.zplus.counselling.repository.postgres.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CounselingSessionService {

    private final CounselingSessionRepository counselingSessionRepository;
    private final UserRepository userRepository;

    public CounselingSessionResponse bookSession(UUID userId, CounselingSessionRequest request) {
        log.info("Booking counseling session for user: {} with counselor: {}", userId, request.getCounselorId());
        
        // Validate user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        // Validate counselor exists
        User counselor = userRepository.findById(request.getCounselorId())
                .orElseThrow(() -> new ResourceNotFoundException("Counselor not found with id: " + request.getCounselorId()));
        
        // Create counseling session
        CounselingSession session = new CounselingSession();
        session.setUser(user);
        session.setCounselor(counselor);
        session.setScheduledAt(request.getScheduledAt());
        
        // Convert string session type to enum
        try {
            CounselingSession.SessionType sessionType = CounselingSession.SessionType.valueOf(request.getSessionType().toUpperCase());
            session.setSessionType(sessionType);
        } catch (IllegalArgumentException e) {
            // Default to INDIVIDUAL_COUNSELING if invalid type
            session.setSessionType(CounselingSession.SessionType.INDIVIDUAL_COUNSELING);
        }
        
        session.setStatus(CounselingSession.SessionStatus.SCHEDULED);
        session.setSessionNotes(request.getSessionNotes());
        session.setDurationMinutes(request.getDurationMinutes());
        session.setMeetingLink(request.getMeetingLink());
        // Note: feeAmount would need to be added to request DTO or calculated separately
        
        CounselingSession savedSession = counselingSessionRepository.save(session);
        log.info("Successfully booked counseling session with id: {}", savedSession.getId());
        
        return mapToResponse(savedSession);
    }

    @Transactional(readOnly = true)
    public Page<CounselingSessionResponse> getUserSessions(UUID userId, Pageable pageable) {
        log.info("Fetching counseling sessions for user: {}", userId);
        
        // Validate user exists
        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        Page<CounselingSession> sessions = counselingSessionRepository.findByUserIdOrderByScheduledAtDesc(userId, pageable);
        
        return sessions.map(this::mapToResponse);
    }

    @Transactional(readOnly = true)
    public Page<CounselingSessionResponse> getCounselorSessions(UUID counselorId, Pageable pageable) {
        log.info("Fetching counseling sessions for counselor: {}", counselorId);
        
        // Validate counselor exists
        userRepository.findById(counselorId)
                .orElseThrow(() -> new ResourceNotFoundException("Counselor not found with id: " + counselorId));
        
        Page<CounselingSession> sessions = counselingSessionRepository.findByCounselorIdOrderByScheduledAtDesc(counselorId, pageable);
        
        return sessions.map(this::mapToResponse);
    }

    @Transactional(readOnly = true)
    public CounselingSessionResponse getSessionById(UUID sessionId) {
        log.info("Fetching counseling session with id: {}", sessionId);
        
        CounselingSession session = counselingSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Counseling session not found with id: " + sessionId));
        
        return mapToResponse(session);
    }

    public CounselingSessionResponse updateSessionStatus(UUID sessionId, CounselingSession.SessionStatus status) {
        log.info("Updating session {} status to: {}", sessionId, status);
        
        CounselingSession session = counselingSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Counseling session not found with id: " + sessionId));
        
        session.setStatus(status);
        
        if (status == CounselingSession.SessionStatus.COMPLETED) {
            session.setEndedAt(LocalDateTime.now());
        }
        
        CounselingSession updatedSession = counselingSessionRepository.save(session);
        
        return mapToResponse(updatedSession);
    }

    public CounselingSessionResponse addFeedback(UUID sessionId, Integer rating, String clientFeedback, String counselorFeedback) {
        log.info("Adding feedback to session: {}", sessionId);
        
        CounselingSession session = counselingSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Counseling session not found with id: " + sessionId));
        
        session.setSessionRating(rating);
        session.setClientFeedback(clientFeedback);
        session.setCounselorFeedback(counselorFeedback);
        
        CounselingSession updatedSession = counselingSessionRepository.save(session);
        
        return mapToResponse(updatedSession);
    }

    private CounselingSessionResponse mapToResponse(CounselingSession session) {
        return CounselingSessionResponse.builder()
                .id(session.getId())
                .userId(session.getUser().getId())
                .counselorId(session.getCounselor() != null ? session.getCounselor().getId() : null)
                .counselorName(session.getCounselor() != null ? session.getCounselor().getFullName() : "Unknown")
                .userFullName(session.getUser().getFullName())
                .scheduledAt(session.getScheduledAt())
                .sessionType(session.getSessionType() != null ? session.getSessionType().name() : null)
                .status(session.getStatus().name())
                .sessionNotes(session.getSessionNotes())
                .specialRequirements(null) // Not available in entity, would need to be added
                .durationMinutes(session.getDurationMinutes())
                .platform(null) // Not available in entity, would need to be added
                .meetingLink(session.getMeetingLink())
                .createdAt(session.getCreatedAt())
                .updatedAt(session.getUpdatedAt())
                .userRating(session.getSessionRating())
                .userFeedback(session.getClientFeedback())
                .counselorNotes(session.getCounselorFeedback())
                .build();
    }
}