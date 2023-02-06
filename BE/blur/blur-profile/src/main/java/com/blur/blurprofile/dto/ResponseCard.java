package com.blur.blurprofile.dto;

import com.blur.blurprofile.entity.Interest;
import com.blur.blurprofile.entity.UserInterest;
import com.blur.blurprofile.entity.UserProfile;
import lombok.*;

import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class ResponseCard {

    private String nickname;

    private Integer age;

    private String introduce;

    private Collection<Interest> interests;

    public ResponseCard(UserProfile userProfile, UserInterest userInterest) {
        this.nickname = userProfile.getNickname();
        this.age = userProfile.getAge();
        this.introduce = userProfile.getIntroduce();
        this.interests = userInterest.getInterest();
    }
}
