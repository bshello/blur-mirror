package com.blur.blurprofile.repository;

import com.blur.blurprofile.entity.Interest;
import com.blur.blurprofile.entity.UserInterest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterestRepository extends JpaRepository<Interest, String> {

    public Interest findByUserId(String userId);
}
