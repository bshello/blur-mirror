package com.blur.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Locale;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_profile")
public class UserProfile {

    @Id
    @Column(name = "user_no")
    Long userNo;

    @Column(name = "birthyear")
    Integer birthyear;

    @Column(name = "nickname")
    String nickname;

    @Column(name = "image")
    String image;

    @MapsId("user_no")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_no")
    User user;

    public void setUser(User user) {
        this.user = user;
    }

    public void update(Integer birthyear, String nickname, String image) {
        this.birthyear = birthyear;
        this.nickname = nickname;
        this.image = image;
    }

}
