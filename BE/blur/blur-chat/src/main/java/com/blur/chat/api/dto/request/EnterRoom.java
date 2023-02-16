package com.blur.chat.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("EnterRoom")
public class EnterRoom {
	@ApiModelProperty(value = "userId", example = "userId")
	private String userId;
	@ApiModelProperty(value = "chatroomNo", example = "chatroomNo")
	private Long chatroomNo;
	private String sessionId;
}
