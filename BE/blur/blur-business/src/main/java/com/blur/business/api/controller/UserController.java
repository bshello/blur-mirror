package com.blur.business.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.blur.business.api.dto.UserDto;
import com.blur.business.entity.User;
import com.blur.business.service.EmailService;
import com.blur.business.service.UserService;
import com.blur.business.service.PasswordService;

@Controller
@RequestMapping("/")
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
	public ResponseEntity<?> register(UserDto userDto) {

		User res = userService.register(userDto);
		return ResponseEntity.ok(res);
	}

	@PostMapping("/checkId") // 아이디 중복체크
	public void checkId(@RequestParam("userId") String userId) {

		userService.checkId(userId);
		System.out.println(userService.checkId(userId));
	}

	@PostMapping("/sendAuthEmail") // 이메일 인증메일 발송
	public String sendAuthEmail(@RequestParam("email") String email) throws Exception {

		String confirm = emailService.sendAuthMessage(email);

		return confirm;
	}

//    @GetMapping("/emailConfirm")
//    public String emailConfirm() {
//
//    }

	@PutMapping("/findPassword") // 비밀번호 찾기
	public void findPassword(@RequestParam("userId") String userId) throws Exception {

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
