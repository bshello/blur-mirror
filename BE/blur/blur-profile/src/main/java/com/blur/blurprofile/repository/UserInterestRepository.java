package com.blur.blurprofile.repository;

import com.blur.blurprofile.entity.UserInterest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInterestRepository extends JpaRepository<UserInterest, Long> {

    public UserInterest findByUserId(String userId);
}
