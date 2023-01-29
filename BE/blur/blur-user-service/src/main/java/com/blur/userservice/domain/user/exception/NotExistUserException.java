package com.blur.userservice.domain.user.exception;

import com.blur.userservice.global.exception.CustomException;
import org.springframework.http.HttpStatus;

public class NotExistUserException extends CustomException {

    public NotExistUserException(String message) {
        super(HttpStatus.CONFLICT, message);
    }

}
