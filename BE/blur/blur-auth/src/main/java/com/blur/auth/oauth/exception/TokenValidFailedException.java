package com.blur.auth.oauth.exception;

public class TokenValidFailedException extends RuntimeException {

    public TokenValidFailedException() {
        super("Failed to create Token.");
    }

    private TokenValidFailedException(String message) {
        super(message);
    }
}
