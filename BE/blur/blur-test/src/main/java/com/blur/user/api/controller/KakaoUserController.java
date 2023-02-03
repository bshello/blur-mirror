package com.blur.user.api.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blur.user.api.dto.ResponseDto;
import com.blur.user.api.dto.response.LoginDto;
import com.blur.user.api.service.KakaoUserService;
import com.blur.user.api.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "KakaoUser Login")
@Slf4j
@RequiredArgsConstructor
@RestController
public class KakaoUserController {

    private final KakaoUserService kakaoUserService;
    private final UserService userService;

    @ApiOperation(value = "카카오톡 로그인", notes = "카카오톡 로그인")
    @GetMapping("/user/kakao/callback")
    public ResponseDto<LoginDto> kakaoLogin(@RequestParam String code, HttpServletResponse response) throws IOException{
        ResponseDto<LoginDto> loginDto = kakaoUserService.kakaoLogin(code, response);
//        userService.setGuestWorkspace(loginDto.getData().getUsername());
        return loginDto ;
    }
}
