package com.blur.chat.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@ApiModel("UserInfoDto")
public class UserInfoDto {
	@ApiModelProperty(value = "userNo", example = "userNo")
	private Long userNo;
	@ApiModelProperty(value = "userId", example = "userId")
	private String userId;
	@ApiModelProperty(value = "nickname", example = "nickname")
	private String nickname;
}
