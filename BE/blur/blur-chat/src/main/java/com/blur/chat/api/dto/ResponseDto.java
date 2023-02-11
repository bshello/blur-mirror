package com.blur.chat.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("ResponseDto")
public class ResponseDto<T> {
	@ApiModelProperty(value = "success 메세지", example = "true")
    private boolean success;
	@ApiModelProperty(value = "전달 데이터", example = "data")
    private T data;
	@ApiModelProperty(value = "에러 메세지", example = "Error")
    private Error error;

    public static <T> ResponseDto<T> success(T data) {
        return new ResponseDto<>(true, data, null);
    }

    public static <T> ResponseDto<T> fail(String code, String message) {
        return new ResponseDto<>(false, null, new Error(code, message));
    }

    @Getter
    @AllArgsConstructor
    static class Error {
    	@ApiModelProperty(value = "에러 코드", example = "404")
        private String code;
    	@ApiModelProperty(value = "에러 메세지", example = "에러 메세지")
        private String message;
    }

}
