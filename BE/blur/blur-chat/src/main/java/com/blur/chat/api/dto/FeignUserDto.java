package com.blur.chat.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class FeignUserDto {
	private Long userNo;
	private String userId;
	private String nickname;
}
