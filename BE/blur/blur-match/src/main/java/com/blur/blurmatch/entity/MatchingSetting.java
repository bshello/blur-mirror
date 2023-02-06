package com.blur.blurmatch.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Builder
@Table(name = "matcing_setting")
public class MatchingSetting {

    @JsonIgnore
    @Column(name = "user_no")
    @Id
    private Long userNo;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "max_distance")
    private Integer maxDistance;

    @Column(name = "min_age")
    private Integer minAge;

    @Column(name = "max_age")
    private Integer maxAge;

    @Builder
    public MatchingSetting(Long userNo, String userId, Integer maxDistance, Integer minAge, Integer maxAge) {
        this.userNo = userNo;
        this.userId = userId;
        this.maxDistance = maxDistance;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

}
