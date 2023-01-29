package com.blur.userservice.domain.jwt.exception;

import com.blur.userservice.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class AccessTokenNotValidException extends CustomException {

    public AccessTokenNotValidException(String message) {
        super(HttpStatus.UNAUTHORIZED, message);
    }
}
