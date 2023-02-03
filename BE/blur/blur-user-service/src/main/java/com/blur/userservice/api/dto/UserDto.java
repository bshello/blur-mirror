package com.blur.userservice.api.dto;

import com.blur.userservice.api.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class UserDto {

    private String userId;

    private String password;

    private String email;

    private String gender;

    /* DTO -> Entity */
    public User toEntity() {
    	User user = User.builder()
                .userId(userId)
                .password(password)
                .email(email)
                .build();
        return user;
    }

    public UserDto(User user) {
        this.userId = user.getUserId();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.gender = user.getGender();
    }

}
