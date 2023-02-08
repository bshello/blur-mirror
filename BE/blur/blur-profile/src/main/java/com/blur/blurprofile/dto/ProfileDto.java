package com.blur.blurprofile.dto;

import com.blur.blurprofile.entity.UserProfile;
import lombok.*;

import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class ProfileDto {

    private String userId;

    private Integer age;

    private String nickname;

    private String image;

    private String gender;

    private String introduce;

    public ProfileDto(UserProfile userProfile) {
        this.userId = userProfile.getUserId();
        this.age = userProfile.getAge();
        this.nickname = userProfile.getNickname();
        this.image = userProfile.getImage();
        this.gender = userProfile.getGender();
        this.introduce = userProfile.getIntroduce();
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Builder
    @Setter
    public static class UserInterestDto {
        private String userId;

        private Collection<String> interest;
    }
}
