package com.blur.blurprofile.dto;

import com.blur.blurprofile.entity.Interest;
import com.blur.blurprofile.entity.UserInterest;
import com.blur.blurprofile.entity.UserProfile;
import lombok.*;

import java.util.Collection;
import java.util.List;

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

    @NoArgsConstructor
    @Getter
    @Setter
    public static class RequestUserInterestDto {

        private List<Interest> Interests;

        public RequestUserInterestDto(List<Interest> interests) {
            this.Interests = interests;
        }
    }
}
