package com.blur.auth.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FeignUserInfo {
	private Long userNo;
	private String userId;
	private String nickname;
}
