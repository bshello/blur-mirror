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

    private String userId;

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

    public UserProfileDto(UserProfile userProfile, User user) {
        this.userId = userProfile.getUserId();
        this.birthyear = userProfile.getBirthyear();
        this.nickname = userProfile.getNickname();
        this.image = userProfile.getImage();
        this.gender = user.getGender();
    }
}
