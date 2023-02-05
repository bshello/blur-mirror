package com.blur.blurprofile.repository;

import com.blur.blurprofile.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    public UserProfile findByUserId(String userId);
}