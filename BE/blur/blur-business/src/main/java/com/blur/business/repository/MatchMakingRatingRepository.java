package com.blur.business.repository;

import com.blur.business.entity.MatchMakingRating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchMakingRatingRepository extends JpaRepository<MatchMakingRating, String> {

    MatchMakingRating findByUserId(String userId);
}
