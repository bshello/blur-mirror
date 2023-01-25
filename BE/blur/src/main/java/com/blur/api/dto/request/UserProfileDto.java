package com.blur.api.dto.request;

import com.blur.entity.User;
import com.blur.entity.UserProfile;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class UserProfileDto {

    private Long userNo;

    private Integer birthyear;

    private String nickname;

    private String image;

    private Boolean gender;

    public UserProfileDto(UserProfile userProfile) {
        this.userNo = userProfile.getUserNo();
        this.birthyear = userProfile.getBirthyear();
        this.nickname = userProfile.getNickname();
        this.image = userProfile.getImage();
    }

    public UserProfileDto(UserProfile userProfile, User user) {
        this.userNo = userProfile.getUserNo();
        this.birthyear = userProfile.getBirthyear();
        this.nickname = userProfile.getNickname();
        this.image = userProfile.getImage();
        this.gender = user.getGender();
    }
}
