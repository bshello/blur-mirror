package com.blur.business.api.dto;

import com.blur.business.entity.Token;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class TokenDto {
//	private Long UserNo;
	private String UserId;
	private String refreshToken;
	
//	public Token toEntity() {
//		Token token = Token.builder()
//				.UserId(UserId)
//				.refreshToken(refreshToken)
//				.build();
//		return token;
//	}

}
