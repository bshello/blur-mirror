package com.blur.userservice.api.repository;

import com.blur.userservice.api.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {
    public UserProfile findByUserId(String userId);
}
