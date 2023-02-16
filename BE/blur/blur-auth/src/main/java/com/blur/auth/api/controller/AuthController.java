package com.blur.auth.api.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blur.auth.api.dto.LoginModel;
import com.blur.auth.api.entity.User;
import com.blur.auth.api.entity.UserRefreshToken;
import com.blur.auth.api.repository.UserRefreshTokenRepository;
import com.blur.auth.api.repository.UserRepository;
import com.blur.auth.common.Response;
import com.blur.auth.config.properties.AppProperties;
import com.blur.auth.oauth.entity.AuthToken;
import com.blur.auth.oauth.entity.AuthTokenProvider;
import com.blur.auth.oauth.entity.RoleType;
import com.blur.auth.oauth.entity.UserPrincipal;
import com.blur.auth.utils.CookieUtil;
import com.blur.auth.utils.HeaderUtil;

import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Api(value = "인증 API", tags = {"blur-auth"})
public class AuthController {

    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final UserRefreshTokenRepository userRefreshTokenRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final static long THREE_DAYS_MSEC = 259200000;
//    private final static long THREE_DAYS_MSEC = 5;
    private final static String REFRESH_TOKEN = "refresh_token";

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "로그인에 필요한 아이디 패스워드 입력")
    @ApiResponses(value= {
        @ApiResponse(code = 200, message = "SUCCESS", response = ApiResponse.class),
        @ApiResponse(code = 400, message = "NOT FOUND"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
    public Response<?> login(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestBody @ApiParam(value="로그인 정보", required = true) LoginModel loginModel
    ) {
    	
    	System.out.printf(loginModel.getUserId(), loginModel.getPassword());
    	
    	User user = userRepository.findByUserId(loginModel.getUserId());
    	
    	if(user == null) 
    		return Response.IDfail();
    	if(!encoder.matches(loginModel.getPassword(), user.getPassword()))
    		return Response.PWfail();
    	
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                		loginModel.getUserId(),
                		loginModel.getPassword()
                )
        );

        
        String userId = loginModel.getUserId();
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Date now = new Date();
        AuthToken accessToken = tokenProvider.createAuthToken(
                userId,
                ((UserPrincipal) authentication.getPrincipal()).getRoleType().getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
        AuthToken refreshToken = tokenProvider.createAuthToken(
                appProperties.getAuth().getTokenSecret(),
                new Date(now.getTime() + refreshTokenExpiry)
        );

        // userId refresh token 으로 DB 확인
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userId);
        if (userRefreshToken == null) {
            // 없는 경우 새로 등록
            userRefreshToken = new UserRefreshToken(userId, refreshToken.getToken());
            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
        } else {
            // DB에 refresh 토큰 업데이트
            userRefreshToken.setRefreshToken(refreshToken.getToken());
        }

        int cookieMaxAge = (int) refreshTokenExpiry / 60;
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
        CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);
        return Response.success("token", accessToken.getToken());
    }

    @GetMapping("/refresh")
    @ApiOperation(value = "엑세스 토큰 재 발급", notes = "리프레시 토큰 확인 후 재발급")
    @ApiResponses(value= {
        @ApiResponse(code = 200, message = "SUCCESS", response = ApiResponse.class),
        @ApiResponse(code = 400, message = "NOT FOUND"),
        @ApiResponse(code = 500, message = "Invalid access token."),
        @ApiResponse(code = 500, message = "Invalid refresh token."),
        @ApiResponse(code = 500, message = "Not expired token yet.")
    })
    public Response<?> refreshToken (HttpServletRequest request, HttpServletResponse response) {
        // access token 확인
        String accessToken = HeaderUtil.getAccessToken(request);
        AuthToken authToken = tokenProvider.convertAuthToken(accessToken);
        if (!authToken.validate()) {
            return Response.invalidAccessToken();
        }

        // expired access token 인지 확인
        Claims claims = authToken.getExpiredTokenClaims();
        if (claims == null) {
            return Response.notExpiredTokenYet();
        }

        String userId = claims.getSubject();
        RoleType roleType = RoleType.of(claims.get("role", String.class));

        // refresh token
        String refreshToken = CookieUtil.getCookie(request, REFRESH_TOKEN)
                .map(Cookie::getValue)
                .orElse((null));
        AuthToken authRefreshToken = tokenProvider.convertAuthToken(refreshToken);

        if (authRefreshToken.validate()) {
            return Response.invalidRefreshToken();
        }

        // userId refresh token 으로 DB 확인
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserIdAndRefreshToken(userId, refreshToken);
        if (userRefreshToken == null) {
            return Response.invalidRefreshToken();
        }

        Date now = new Date();
        AuthToken newAccessToken = tokenProvider.createAuthToken(
                userId,
                roleType.getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        long validTime = authRefreshToken.getTokenClaims().getExpiration().getTime() - now.getTime();

        // refresh 토큰 기간이 3일 이하로 남은 경우, refresh 토큰 갱신
        if (validTime <= THREE_DAYS_MSEC) {
            // refresh 토큰 설정
            long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

            authRefreshToken = tokenProvider.createAuthToken(
                    appProperties.getAuth().getTokenSecret(),
                    new Date(now.getTime() + refreshTokenExpiry)
            );

            // DB에 refresh 토큰 업데이트
            userRefreshToken.setRefreshToken(authRefreshToken.getToken());

            int cookieMaxAge = (int) refreshTokenExpiry / 60;
            CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
            CookieUtil.addCookie(response, REFRESH_TOKEN, authRefreshToken.getToken(), cookieMaxAge);
        }

        return Response.success("token", newAccessToken.getToken());
    }
    
	@GetMapping
	public Response<?> getUserId(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String accessToken = HeaderUtil.getAccessToken(request);
		System.out.println(accessToken);
		AuthToken authToken = tokenProvider.convertAuthToken(accessToken);
        if (!authToken.validate()) {
            return Response.invalidAccessToken();
//        	return new ResponseEntity<> (HttpStatus.BAD_REQUEST);
        }
        
        Claims claims = authToken.getTokenClaims();
//        if (claims == null) {
//            return ApiResponse.notExpiredTokenYet();
//        }
        
        String userId = claims.getSubject();
        Map<String, String> map = new HashMap<>();
        map.put("userId", userId);
       
        
        return Response.success("userId", userId);
//        return new ResponseEntity<> (userId, HttpStatus.OK);
	}
}
