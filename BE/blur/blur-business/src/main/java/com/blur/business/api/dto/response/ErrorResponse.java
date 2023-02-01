package com.blur.business.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 에러 메세지 관련
 */
@Getter
@AllArgsConstructor
public class ErrorResponse {
	private final int errorCode;
    private final String errorMessage;
}
