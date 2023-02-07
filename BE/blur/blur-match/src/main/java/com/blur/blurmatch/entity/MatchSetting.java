package com.blur.blurmatch.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Builder
@Table(name = "matcing_setting")
public class MatchSetting {

    @JsonIgnore
    @Column(name = "user_id")
    @Id
    private String userId;

    @Column(name = "max_distance")
    private Integer maxDistance;

    @Column(name = "min_age")
    private Integer minAge;

    @Column(name = "max_age")
    private Integer maxAge;

    @Builder
    public MatchSetting(String userId, Integer maxDistance, Integer minAge, Integer maxAge) {
        this.userId = userId;
        this.maxDistance = maxDistance;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

}
