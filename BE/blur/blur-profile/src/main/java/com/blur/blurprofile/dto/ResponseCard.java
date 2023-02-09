package com.blur.blurprofile.dto;

import com.blur.blurprofile.entity.Interest;
import com.blur.blurprofile.entity.UserInterest;
import com.blur.blurprofile.entity.UserProfile;
import lombok.*;
import org.apache.catalina.User;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class ResponseCard {

    private String nickname;

    private Integer age;

    private String introduce;

    private List<UserInterest> userInterests;

    public ResponseCard(UserProfile userProfile, List<UserInterest> userInterests) {
        this.nickname = userProfile.getNickname();
        this.age = userProfile.getAge();
        this.introduce = userProfile.getIntroduce();
        this.userInterests = userInterests;
    }
}
