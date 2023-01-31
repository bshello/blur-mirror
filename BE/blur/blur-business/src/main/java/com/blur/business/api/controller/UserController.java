package com.blur.business.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.blur.business.api.dto.UserDto;
import com.blur.business.entity.User;
import com.blur.business.service.EmailService;
import com.blur.business.service.UserService;
import com.blur.business.service.PasswordService;

import java.util.Map;

@RestController
@RequestMapping("")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	EmailService emailService;

	@Autowired
	PasswordService passwordService;

	@GetMapping
	public String index() {
		return "index";
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserDto userDto) {
		System.out.println(userDto.getUserId());
		User res = userService.register(userDto);
		return ResponseEntity.ok(res);
	}

	@PostMapping("/checkId") // 아이디 중복체크
	public Boolean checkId(@RequestBody Map<String,String> param) {

		String userId = param.get("userId");
		Boolean res = userService.checkId(userId);
		return res;

	}

	@PostMapping("/sendAuthEmail") // 이메일 인증메일 발송
	public String sendAuthEmail(@RequestBody Map<String,String> param) throws Exception {

		String email = param.get("email");
		String confirm = emailService.sendAuthMessage(email);

		return confirm;
	}


	@PutMapping("/findPassword") // 비밀번호 찾기
	public void findPassword(@RequestBody Map<String,String> param) throws Exception {

		String userId = param.get("userId");
		passwordService.sendTempPassword(userId);
	}

	@GetMapping("/testLogin")
	public String testLogin() {
		return "testLogin";
	}

	@GetMapping("/testRegister")
	public String testRegister() {
		return "testRegister";
	}
}
