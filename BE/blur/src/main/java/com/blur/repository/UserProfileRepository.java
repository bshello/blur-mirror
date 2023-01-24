package com.blur.repository;

import com.blur.entity.User;
import com.blur.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    public UserProfile findByUserNo(String userNo);
}
