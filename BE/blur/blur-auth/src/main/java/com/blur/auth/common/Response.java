package com.blur.auth.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;


@Getter
@RequiredArgsConstructor
public class Response<T> {
    public final static int SUCCESS = 200;
    public final static int NOT_FOUND = 400;
    public final static int FAILED = 500;
    public final static int NOT_FOUND_ID = 407;
    public final static int NOT_FOUND_PW = 408;
    public final static String SUCCESS_MESSAGE = "SUCCESS";
    public final static String NOT_FOUND_MESSAGE = "NOT FOUND";
    public final static String NOT_FOUND_ID_MESSAGE = "존재하지 않는 아이디입니다.";
    public final static String NOT_FOUND_PW_MESSAGE = "비밀번호가 틀렸습니다.";
    public final static String FAILED_MESSAGE = "서버에서 오류가 발생하였습니다.";
    public final static String INVALID_ACCESS_TOKEN = "Invalid access token.";
    public final static String INVALID_REFRESH_TOKEN = "Invalid refresh token.";
    public final static String NOT_EXPIRED_TOKEN_YET = "Not expired token yet.";

    private final ApiResponseHeader header;
    private final Map<String, T> body;

    public static <T> Response<T> success(String name, T body) {
        Map<String, T> map = new HashMap<>();
        map.put(name, body);

        return new Response<> (new ApiResponseHeader(SUCCESS, SUCCESS_MESSAGE), map);
    }

    public static <T> Response<T> fail() {
        return new Response<> (new ApiResponseHeader(FAILED, FAILED_MESSAGE), null);
    }
    
    public static <T> Response<T> IDfail() {
        return new Response<> (new ApiResponseHeader(NOT_FOUND_ID, NOT_FOUND_ID_MESSAGE), null);
    }
    
    public static <T> Response<T> PWfail() {
        return new Response<> (new ApiResponseHeader(NOT_FOUND_PW, NOT_FOUND_PW_MESSAGE), null);
    }
    
    public static <T> Response<T> invalidAccessToken() {
        return new Response<> (new ApiResponseHeader(FAILED, INVALID_ACCESS_TOKEN), null);
    }

    public static <T> Response<T> invalidRefreshToken() {
        return new Response<> (new ApiResponseHeader(FAILED, INVALID_REFRESH_TOKEN), null);
    }

    public static <T> Response<T> notExpiredTokenYet() {
        return new Response<> (new ApiResponseHeader(FAILED, NOT_EXPIRED_TOKEN_YET), null);
    }
}
