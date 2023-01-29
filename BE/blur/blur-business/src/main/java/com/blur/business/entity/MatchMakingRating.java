package com.blur.business.entity;

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

    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(name = "mmr")
    private Integer mmr;

    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id")
    private User user;
}
