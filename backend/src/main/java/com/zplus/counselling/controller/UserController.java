package com.zplus.counselling.controller;

import com.zplus.counselling.dto.request.UpdateProfileRequest;
import com.zplus.counselling.dto.response.UserProfileResponse;
import com.zplus.counselling.entity.postgres.User;
import com.zplus.counselling.security.UserPrincipal;
import com.zplus.counselling.service.auth.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User management APIs")
@SecurityRequirement(name = "Bearer Authentication")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    @Operation(summary = "Get user profile", description = "Retrieve authenticated user's profile")
    public ResponseEntity<UserProfileResponse> getProfile(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        User user = userService.findById(userPrincipal.getId());
        return ResponseEntity.ok(convertToUserProfileResponse(user));
    }

    @PutMapping("/profile")
    @Operation(summary = "Update user profile", description = "Update authenticated user's profile")
    public ResponseEntity<UserProfileResponse> updateProfile(
            @Valid @RequestBody UpdateProfileRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        User user = userService.updateProfile(
            userPrincipal.getId(),
            request.getFullName(),
            request.getPhone(),
            request.getLocation()
        );
        return ResponseEntity.ok(convertToUserProfileResponse(user));
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Get user dashboard", description = "Get user dashboard with summary information")
    public ResponseEntity<UserProfileResponse> getDashboard(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        User user = userService.findById(userPrincipal.getId());
        return ResponseEntity.ok(convertToUserProfileResponse(user));
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