package com.blur.blurmatch.repository;

import com.blur.blurmatch.entity.MatchingSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchingSettingRepository extends JpaRepository<MatchingSetting, Long> {

    MatchingSetting findByUserId(String userId);
}
