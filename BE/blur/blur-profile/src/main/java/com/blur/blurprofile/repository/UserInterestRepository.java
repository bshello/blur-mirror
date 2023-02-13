package com.blur.blurprofile.repository;

import com.blur.blurprofile.entity.UserInterest;
import com.blur.blurprofile.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserInterestRepository extends JpaRepository<UserInterest, Long> {

    public List<UserInterest> findByUserProfile(UserProfile userProfile);
}
