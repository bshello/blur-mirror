package com.blur.business.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "matcing_setting")
public class MatchingSetting {

    @JsonIgnore
    @Column(name = "user_no")
    @Id
    private Integer userNo;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "max_distance")
    private Integer maxDistance;

    @Column(name = "min_age")
    private Integer minAge;

    @Column(name = "max_age")
    private Integer maxAge;

    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_no")
    private User user;

}
