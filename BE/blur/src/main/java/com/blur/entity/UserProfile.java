package com.blur.entity;

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
@Table(name = "user_profile")
public class UserProfile {

    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(name = "birthyear")
    private Integer birthyear;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "image")
    private String image;

    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id")
    private User user;

    public void setUser(User user) {
        this.user = user;
        this.userId = user.getUserId();
    }

    public void updateProfile(Integer birthyear, String nickname, String image) {
        this.birthyear = birthyear;
        this.nickname = nickname;
        this.image = image;
    }

}
