package com.blur.userservice.api.controller;

import java.util.Date;
import java.util.Map;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blur.userservice.api.dto.ErrorResponse;
import com.blur.userservice.api.dto.UserDto;
import com.blur.userservice.api.entity.User;
import com.blur.userservice.api.repository.UserRepository;
import com.blur.userservice.api.service.EmailService;
import com.blur.userservice.api.service.PasswordService;
import com.blur.userservice.api.service.UserService;
import com.blur.userservice.common.ApiResponse;
import com.blur.userservice.config.properties.AppProperties;
import com.blur.userservice.oauth.entity.AuthToken;
import com.blur.userservice.oauth.entity.AuthTokenProvider;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
	
    private final UserService userService;
    private final UserRepository userRepository;
	private EmailService emailService;
	private PasswordService passwordService;
	private final MessageSource messageSource;
	private final PasswordEncoder passwordEncoder;
	private final AuthTokenProvider tokenProvider;
	private final AppProperties appProperties;

    @GetMapping
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.getUser(principal.getUsername());

        return ApiResponse.success("user", user);
    }
    
    
    /**
     * 로그인 JWT 발급
     * @param userInfo {email, password}
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> userInfo) {
        User user = userRepository.findByUserId(userInfo.get("userId"));
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(messageSource.getMessage("error.none.user", null, LocaleContextHolder.getLocale())));
        }

        if (!passwordEncoder.matches(userInfo.get("password"), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(messageSource.getMessage("error.wrong.password", null, LocaleContextHolder.getLocale())));
        }

//        String token = jwtTokenProvider.createToken(user.getUsername(), user.getUserSeq());
        Date now = new Date();
        AuthToken accessToken = tokenProvider.createAuthToken(
        		user.getUserId(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        // refresh 토큰 설정
        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

        AuthToken refreshToken = tokenProvider.createAuthToken(
                appProperties.getAuth().getTokenSecret(),
                new Date(now.getTime() + refreshTokenExpiry)
        );

        return ResponseEntity.ok(new LoginUserResponse(accessToken, refreshToken));
    }
    
    
    @PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserDto userDto) throws Exception{

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
	public ResponseEntity<?> sendAuthEmail(@RequestBody Map<String,String> param) throws Exception {

		String email = param.get("email");
		emailService.sendAuthMessage(email);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@PutMapping("/findPassword") // 비밀번호 찾기
	public ResponseEntity<Boolean> findPassword(@RequestBody Map<String,String> param) throws Exception {

		String userId = param.get("userId");
		Boolean res = passwordService.sendTempPassword(userId);
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	
	
	
	@Data
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public class LoginUserResponse {
        private AuthToken accessToken;
        private AuthToken refreshToken;
        public LoginUserResponse(AuthToken accessToken, AuthToken refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }
    }
}
