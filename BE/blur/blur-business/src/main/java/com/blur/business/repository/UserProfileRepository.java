package com.blur.business.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blur.business.entity.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, String> {
    public UserProfile findByUserId(String userId);
}
