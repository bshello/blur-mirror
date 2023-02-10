package com.blur.auth.api.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.HEAD;
import javax.ws.rs.HeaderParam;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blur.auth.api.dto.LoginModel;
import com.blur.auth.api.dto.UserInfo;
import com.blur.auth.api.entity.User;
import com.blur.auth.api.entity.UserDto;
import com.blur.auth.api.entity.UserRefreshToken;
import com.blur.auth.api.repository.UserRefreshTokenRepository;
import com.blur.auth.api.repository.UserRepository;
import com.blur.auth.api.service.EmailService;
import com.blur.auth.api.service.PasswordService;
import com.blur.auth.api.service.UserService;
import com.blur.auth.common.ApiResponse;
import com.blur.auth.common.ApiResponseHeader;
import com.blur.auth.config.properties.AppProperties;
import com.blur.auth.oauth.entity.AuthToken;
import com.blur.auth.oauth.entity.AuthTokenProvider;
import com.blur.auth.oauth.entity.RoleType;
import com.blur.auth.oauth.entity.UserPrincipal;
import com.blur.auth.utils.CookieUtil;
import com.blur.auth.utils.HeaderUtil;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
	
    private final UserService userService;
    private final UserRepository userRepository;

	private final MessageSource messageSource;
	private final PasswordEncoder passwordEncoder;
	private final AuthTokenProvider tokenProvider;
	private final AppProperties appProperties;

    private final EmailService emailService;

    private final PasswordService passwordService;
    
    private final AuthenticationManager authenticationManager;
    private final UserRefreshTokenRepository userRefreshTokenRepository;
    
    private final static long THREE_DAYS_MSEC = 259200000;
    private final static String REFRESH_TOKEN = "refresh_token";

//    @GetMapping
//    public ApiResponse getUser() {
//        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User user = userService.getUser(principal.getUsername());
//
//        return ApiResponse.success("user", user);
//    }
    
    
//    /**
//     * 로그인 JWT 발급
//     * @param userInfo {email, password}
//     * @return
//     */
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Map<String, String> userInfo) {
//        User user = userRepository.findByUserId(userInfo.get("userId"));
//        if (user == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body(new ErrorResponse(messageSource.getMessage("error.none.user", null, LocaleContextHolder.getLocale())));
//        }
//
//        if (!passwordEncoder.matches(userInfo.get("password"), user.getPassword())) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body(new ErrorResponse(messageSource.getMessage("error.wrong.password", null, LocaleContextHolder.getLocale())));
//        }
//
////        String token = jwtTokenProvider.createToken(user.getUsername(), user.getUserSeq());
//        Date now = new Date();
//        AuthToken accessToken = tokenProvider.createAuthToken(
//        		user.getUserId(),
//                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
//        );
//
//        // refresh 토큰 설정
//        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
//
//        AuthToken refreshToken = tokenProvider.createAuthToken(
//                appProperties.getAuth().getTokenSecret(),
//                new Date(now.getTime() + refreshTokenExpiry)
//        );
//
//        return ResponseEntity.ok(new LoginUserResponse(accessToken, refreshToken));
//    }
    
    @PostMapping("/login")
    public ApiResponse login(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestBody LoginModel loginModel
    ) {
    	
    	System.out.printf(loginModel.getUserId(), loginModel.getPassword());
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
        return ApiResponse.success("token", accessToken.getToken());
    }

    @GetMapping("/refresh")
    public ApiResponse refreshToken (HttpServletRequest request, HttpServletResponse response) {
        // access token 확인
        String accessToken = HeaderUtil.getAccessToken(request);
        AuthToken authToken = tokenProvider.convertAuthToken(accessToken);
        if (!authToken.validate()) {
            return ApiResponse.invalidAccessToken();
        }

        // expired access token 인지 확인
        Claims claims = authToken.getExpiredTokenClaims();
        if (claims == null) {
            return ApiResponse.notExpiredTokenYet();
        }

        String userId = claims.getSubject();
        RoleType roleType = RoleType.of(claims.get("role", String.class));

        // refresh token
        String refreshToken = CookieUtil.getCookie(request, REFRESH_TOKEN)
                .map(Cookie::getValue)
                .orElse((null));
        AuthToken authRefreshToken = tokenProvider.convertAuthToken(refreshToken);

        if (authRefreshToken.validate()) {
            return ApiResponse.invalidRefreshToken();
        }

        // userId refresh token 으로 DB 확인
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserIdAndRefreshToken(userId, refreshToken);
        if (userRefreshToken == null) {
            return ApiResponse.invalidRefreshToken();
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

        return ApiResponse.success("token", newAccessToken.getToken());
    }
    
    @PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserDto userDto) throws Exception{
    	System.out.println(userDto);
		userService.register(userDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(null);
	}

	@PostMapping("/checkId") // 아이디 중복체크
	public ResponseEntity<Boolean> checkId(@RequestBody Map<String,String> param) {

		String userId = param.get("userId");
		Boolean res = userService.checkId(userId);
		return ResponseEntity.status(HttpStatus.OK).body(res);

	}

	@PostMapping("/sendAuthEmail") // 이메일 인증메일 발송
	public ResponseEntity<?> sendAuthEmail(@RequestBody Map<String, String> param) throws Exception {
		String email = param.get("email");
		System.out.println(email);
		emailService.sendAuthMessage(email);
		System.out.println(param);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@PostMapping("/checkEmail")
	public ResponseEntity<?> checkEmail(@RequestBody Map<String, String> param) throws Exception {
		String email = param.get("email");
		String authKey = param.get("authKey");
		System.out.println(email + " " + authKey);
		if(emailService.getAuthKey(email, authKey))
			return new ResponseEntity<> (HttpStatus.OK);
		else
			return new ResponseEntity<> (HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/findPassword") // 비밀번호 찾기
	public ResponseEntity<Boolean> findPassword(@RequestBody Map<String,String> param) throws Exception {

		String userId = param.get("userId");
		Boolean res = passwordService.sendTempPassword(userId);
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	
	@PostMapping("userInfo/{userId}")
	public ResponseEntity<?> getUserInfo(@PathVariable String userId) throws Exception{
		UserInfo userInfo = userService.getUserInfo(userId);
		userInfo.setNickname("test");
		return new ResponseEntity<>(userInfo, HttpStatus.OK);
	}
	
	@GetMapping
	public ApiResponse getUserId(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String accessToken = HeaderUtil.getAccessToken(request);
		System.out.println(accessToken);
		AuthToken authToken = tokenProvider.convertAuthToken(accessToken);
        if (!authToken.validate()) {
            return ApiResponse.invalidAccessToken();
        }
        
        Claims claims = authToken.getExpiredTokenClaims();
        if (claims == null) {
            return ApiResponse.notExpiredTokenYet();
        }
        
        String userId = claims.getSubject();
        
        return ApiResponse.success("userId", userId);
	}
	
//	@Data
//    @NoArgsConstructor(access = AccessLevel.PROTECTED)
//    public class LoginUserResponse {
//        private AuthToken accessToken;
//        private AuthToken refreshToken;
//        public LoginUserResponse(AuthToken accessToken, AuthToken refreshToken) {
//            this.accessToken = accessToken;
//            this.refreshToken = refreshToken;
//        }
//    }
}
