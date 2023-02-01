package com.blur.business.api.dto;

import com.blur.business.entity.User;
import com.blur.business.entity.UserProfile;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class UserProfileDto {

    private String UserId;

    private Integer birthyear;

    private String nickname;

    private String image;

    private Boolean gender;

    public UserProfile toEntity(User user) {
    	UserProfile userProfile = UserProfile.builder()
                .userId(user.getUserId())
                .birthyear(birthyear)
                .nickname(nickname)
                .image(image)
                .build();
        return userProfile;
    }

    public UserProfileDto(User user, UserProfile UserProfile) {
        this.UserId = UserProfile.getUserId();
        this.birthyear = UserProfile.getBirthyear();
        this.nickname = UserProfile.getNickname();
        this.image = UserProfile.getImage();
        this.gender = user.getGender();
    }
}
