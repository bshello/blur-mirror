package com.blur.userservice.global.client.exception;

import com.blur.userservice.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class FeignClientException extends CustomException {

    public FeignClientException(HttpStatus status, String message) {
        super(status, message);
    }
}
