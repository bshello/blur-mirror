package com.blur.blurprofile.repository;

import com.blur.blurprofile.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, String> {
    public UserProfile findByUserId(String userId);
}
