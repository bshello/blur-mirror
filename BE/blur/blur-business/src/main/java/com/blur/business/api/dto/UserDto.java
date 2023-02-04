package com.blur.business.api.dto;

import com.blur.business.entity.User;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class UserDto {

    private String UserId;

    private String password;

    private String email;

    private Boolean gender;

    /* DTO -> Entity */
    public User toEntity() {
    	User user = User.builder()
                .userId(UserId)
                .password(password)
                .email(email)
                .build();
        return user;
    }

    public UserDto(User user) {
        this.UserId = user.getUserId();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.gender = user.getGender();
    }

}
