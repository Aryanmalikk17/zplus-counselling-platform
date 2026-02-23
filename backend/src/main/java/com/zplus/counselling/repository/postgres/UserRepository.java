package com.zplus.counselling.repository.postgres;

import com.zplus.counselling.entity.postgres.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByFirebaseUid(String firebaseUid);
    
    Boolean existsByEmail(String email);
    
    Optional<User> findByEmailAndIsActiveTrue(String email);
}