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
@Table(name = "mmr")
public class MatchMakingRating {

    @JsonIgnore
    @Column(name = "user_no")
    @Id
    private Integer userNo;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "mmr")
    private Integer mmr;

    @Column(name = "winning_streak")
    private Integer winningStreak;

    @Column(name = "losing_streak")
    private Integer losingStreak;

    @Column(name = "report_count")
    private Integer reportCount;

    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_no")
    private User user;
}
