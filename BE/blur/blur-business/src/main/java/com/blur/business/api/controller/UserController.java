package com.blur.business.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.blur.business.api.dto.UserDto;
import com.blur.business.service.EmailService;
import com.blur.business.service.UserService;
import com.blur.business.service.PasswordService;
import java.util.Map;

@RestController
@RequestMapping("")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private PasswordService passwordService;


	@GetMapping
	public String index() {
		return "index";
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

}
