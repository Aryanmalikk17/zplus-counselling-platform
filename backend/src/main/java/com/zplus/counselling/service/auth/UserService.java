package com.zplus.counselling.service.auth;

import com.zplus.counselling.controller.AuthController;
import com.zplus.counselling.dto.response.UserProfileResponse;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.repository.postgres.UserRepository;
import com.zplus.counselling.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        
        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(UUID id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
        
        return UserPrincipal.create(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public User findById(UUID id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional
    public User save(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public User updateProfile(UUID userId, String fullName, String phone, String location) {
        User user = findById(userId);
        user.setFullName(fullName);
        user.setPhone(phone);
        user.setLocation(location);
        return userRepository.save(user);
    }

    public UserProfileResponse getUserProfile(UUID userId) {
        User user = findById(userId);
        return convertToUserProfileResponse(user);
    }

    @Transactional
    public UserProfileResponse updateUserProfile(UUID userId, AuthController.UpdateProfileRequest request) {
        User user = findById(userId);
        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        if (request.getLocation() != null) {
            user.setLocation(request.getLocation());
        }
        User updatedUser = userRepository.save(user);
        return convertToUserProfileResponse(updatedUser);
    }

    private UserProfileResponse convertToUserProfileResponse(User user) {
        return UserProfileResponse.builder()
            .id(user.getId() != null ? user.getId().toString() : null)
            .email(user.getEmail())
            .fullName(user.getFullName())
            .phone(user.getPhone())
            .location(user.getLocation())
            .subscriptionType(user.getSubscriptionType())
            .isEmailVerified(user.getIsEmailVerified())
            .isPhoneVerified(user.getIsPhoneVerified())
            .createdAt(user.getCreatedAt())
            .build();
    }
}