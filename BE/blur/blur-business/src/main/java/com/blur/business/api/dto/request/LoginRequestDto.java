package com.blur.business.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequestDto {
	private String UserId;
	private String password;
	
	public void encodePassword(String encodedPassword) {
        this.password = encodedPassword;
    }
}
