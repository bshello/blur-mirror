package com.blur.auth.api.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blur.auth.api.dto.UserInfo;
import com.blur.auth.api.entity.UserDto;
import com.blur.auth.api.service.EmailService;
import com.blur.auth.api.service.PasswordService;
import com.blur.auth.api.service.UserService;
import com.blur.auth.oauth.entity.AuthTokenProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Api(value = "유저 API", tags = {"blur-auth"})
public class UserController {
	
    private final UserService userService;

	private final AuthTokenProvider tokenProvider;

    private final EmailService emailService;

    private final PasswordService passwordService;
    
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
    
    
    
    @PostMapping("/register")
    @ApiOperation(value = "회원가입", notes = "회원가입 정보 입력")
    @ApiResponses(value= {
        @ApiResponse(code = 200, message = "SUCCESS", response = ApiResponse.class),
        @ApiResponse(code = 400, message = "NOT FOUND"),
        @ApiResponse(code = 500, message = "서버오류"),
    })
	public ResponseEntity<?> register(@RequestBody @ApiParam(value="회원정보", required = true) UserDto userDto) throws Exception{
    	System.out.println(userDto);
		userService.register(userDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(null);
	}

	@PostMapping("/checkId") // 아이디 중복체크
	@ApiOperation(value = "아이디 중복체크", notes = "회원가입시 입력한 아이디 중복 확인")
    @ApiResponses(value= {
        @ApiResponse(code = 200, message = "SUCCESS", response = ApiResponse.class),
        @ApiResponse(code = 400, message = "NOT FOUND"),
        @ApiResponse(code = 500, message = "서버오류"),
    })
	@ApiImplicitParam( name = "userId", value = "userId", required = true, dataType = "string", paramType = "path", defaultValue = "None")
	public ResponseEntity<Boolean> checkId(@RequestBody 
			@ApiParam(value="유저 아이디 입력", 
			name =  "userId",
		    type = "String",
		    example = "userId",
		    required = true) Map<String,String> param) {

		String userId = param.get("userId");
		Boolean res = userService.checkId(userId);
		return ResponseEntity.status(HttpStatus.OK).body(res);

	}

	@PostMapping("/sendAuthEmail") // 이메일 인증메일 발송
	@ApiOperation(value = "인증메일 전송", notes = "회원가입시 입력한 이메일에 인증메일 전송")
    @ApiResponses(value= {
        @ApiResponse(code = 200, message = "SUCCESS", response = ApiResponse.class),
        @ApiResponse(code = 400, message = "NOT FOUND"),
        @ApiResponse(code = 500, message = "서버오류"),
    })
	@ApiImplicitParam( name = "email", value = "email", required = true, dataType = "string", paramType = "path", defaultValue = "None")
	public ResponseEntity<?> sendAuthEmail(@RequestBody 
			@ApiParam(value="유저 아이디 입력", 
			name =  "email",
		    type = "String",
		    example = "email",
		    required = true)
			Map<String, String> param) throws Exception {
		String email = param.get("email");
		System.out.println(email);
		emailService.sendAuthMessage(email);
		System.out.println(param);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@PostMapping("/checkEmail")
	@ApiOperation(value = "인증메일 확인", notes = "이메일 인증번호 확인 과정")
    @ApiResponses(value= {
        @ApiResponse(code = 200, message = "SUCCESS", response = ApiResponse.class),
        @ApiResponse(code = 400, message = "NOT FOUND"),
        @ApiResponse(code = 500, message = "서버오류"),
    })
	@ApiImplicitParams({
		@ApiImplicitParam( name = "email", value = "email", required = true, dataType = "string", paramType = "path", defaultValue = "None"),
		@ApiImplicitParam( name = "authKey", value = "authKey", required = true, dataType = "string", paramType = "path", defaultValue = "None")
	})
	public ResponseEntity<?> checkEmail(@RequestBody 
			@ApiParam(value="유저 아이디 입력", 
			name =  "email, authKey",
		    type = "String, String",
		    example = "email, authKey",
		    required = true)
			Map<String, String> param) throws Exception {
		String email = param.get("email");
		String authKey = param.get("authKey");
		System.out.println(email + " " + authKey);
		if(emailService.getAuthKey(email, authKey))
			return new ResponseEntity<> (HttpStatus.OK);
		else
			return new ResponseEntity<> (HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/findPassword") // 비밀번호 찾기
	@ApiOperation(value = "비밀번호 찾기", notes = "비밀번호 찾기 과정")
    @ApiResponses(value= {
        @ApiResponse(code = 200, message = "SUCCESS", response = ApiResponse.class),
        @ApiResponse(code = 400, message = "NOT FOUND"),
        @ApiResponse(code = 500, message = "서버오류"),
    })
	@ApiImplicitParam( name = "userId", value = "userId", required = true, dataType = "string", paramType = "path", defaultValue = "None")
	public ResponseEntity<Boolean> findPassword(@RequestBody 
			@ApiParam(value="유저 아이디 입력", 
			name =  "userId",
		    type = "String",
		    example = "userId",
		    required = true)
			Map<String,String> param) throws Exception {

		String userId = param.get("userId");
		Boolean res = passwordService.sendTempPassword(userId);
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	
	@PostMapping("userInfo/{userId}")
	@ApiOperation(value = "유저 아이디 전달", notes = "userId api 전달용")
    @ApiResponses(value= {
        @ApiResponse(code = 200, message = "SUCCESS", response = ApiResponse.class),
        @ApiResponse(code = 400, message = "NOT FOUND"),
        @ApiResponse(code = 500, message = "서버오류"),
    })
	@ApiImplicitParam( name = "userId", value = "userId", required = true, dataType = "string", paramType = "path", defaultValue = "None")
	public ResponseEntity<?> getUserInfo(@PathVariable(name ="userId") String userId) throws Exception{
		UserInfo userInfo = userService.getUserInfo(userId);
		Long userNo = userService.getUserInfo(userId).getUserNo();
//		userInfo.setNickname("test");
		return new ResponseEntity<>(userNo, HttpStatus.OK);
	}
	
	   @GetMapping("/getEmail")
	   @ApiOperation(value = "이메일 가져오기", notes = "이메일")
	   @ApiResponses(value= {
	         @ApiResponse(code = 200, message = "SUCCESS", response = String.class),
	   })
	   public ResponseEntity<?> getEmail(@ApiParam(value = "유저 ID", required = true) @RequestParam("userId") String userId) throws Exception{

	      String userEmail = userService.getEmail(userId);
	      return ResponseEntity.status(HttpStatus.OK).body(userEmail);
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
