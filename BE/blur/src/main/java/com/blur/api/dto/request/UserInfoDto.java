package com.blur.api.dto.request;

import com.blur.entity.User;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class UserInfoDto {

    private Long userNo;

    private String userId;

    private String password;

    private String email;

    /* DTO -> Entity */
    public User toEntity() {
        User user = User.builder()
                .userId(userId)
                .password(password)
                .email(email)
                .build();
        return user;
    }

    public UserInfoDto(User user) {
        this.userNo = user.getUserNo();
        this.userId = user.getUserId();
        this.password = user.getPassword();
        this.email = user.getEmail();
    }

}
