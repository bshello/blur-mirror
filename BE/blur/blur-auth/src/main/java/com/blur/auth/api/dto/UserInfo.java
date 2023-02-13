package com.blur.auth.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class UserInfo {
	private Long userNo;
	private String userId;
//	private String nickname;
	
//	public UserInfo(Long userNo, String userId) {
//		super();
//		this.userNo = userNo;
//		this.userId = userId;
//	}
}
