package com.blur.auth.common;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@ApiModel("ApiResponseHeader")
public class ApiResponseHeader {
    private int code;
    private String message;
}
