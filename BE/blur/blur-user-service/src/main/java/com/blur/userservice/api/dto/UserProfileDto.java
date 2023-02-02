package com.blur.userservice.api.dto;

import com.blur.userservice.api.entity.User;
import com.blur.userservice.api.entity.UserProfile;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class UserProfileDto {

    private String userId;

    private Integer age;

    private String nickname;

    private String image;

    private String gender;

    public UserProfile toEntity(User user) {
    	UserProfile userProfile = UserProfile.builder()
                .userId(user.getUserId())
                .age(age)
                .gender(gender)
                .nickname(nickname)
                .image(image)
                .build();
        return userProfile;
    }

    public UserProfileDto(UserProfile userProfile) {
        this.userId = userProfile.getUserId();
        this.age = userProfile.getAge();
        this.nickname = userProfile.getNickname();
        this.image = userProfile.getImage();
        this.gender = userProfile.getGender();
    }
}
