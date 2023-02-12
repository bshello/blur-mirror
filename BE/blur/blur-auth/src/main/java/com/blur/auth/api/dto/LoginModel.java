package com.blur.auth.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("LoginModel")
public class LoginModel {
	@ApiModelProperty(value = "userId", example = "userId", required=true)
	private String userId;
	@ApiModelProperty(value = "password", example = "password", required=true)
	private String password;
}
