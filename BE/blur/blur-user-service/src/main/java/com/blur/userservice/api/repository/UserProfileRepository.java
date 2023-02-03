package com.blur.userservice.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blur.userservice.api.entity.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {
    public UserProfile findByUserId(String userId);
}
