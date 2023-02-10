package com.blur.blurmatch.repository;

import com.blur.blurmatch.entity.MatchSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchSettingRepository extends JpaRepository<MatchSetting, Long> {

    MatchSetting findByUserId(String userId);
}
