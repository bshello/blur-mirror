package com.blur.auth.api.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel("UserDto")
public class UserDto {
	@ApiModelProperty(value = "userId", example = "userId", required=true)
    private String userId;
	@ApiModelProperty(value = "password", example = "password", required=true)
    private String password;
	@ApiModelProperty(value = "email", example = "email", required=true)
    private String email;

//    private String gender;

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
    }

	@Override
	public String toString() {
		return "UserDto [userId=" + userId + ", password=" + password + ", email=" + email + "]";
	}
}
