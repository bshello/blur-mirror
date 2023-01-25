package com.blur.api.controller;

import com.blur.api.dto.request.UserInfoDto;
import com.blur.api.dto.request.UserProfileDto;
import com.blur.service.EmailService;
import com.blur.service.PasswordService;
import com.blur.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserInfoController {

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    EmailService emailService;

    @Autowired
    PasswordService passwordService;

    @GetMapping({ "", "/" })
    public String index() {
        return "index";
    }

    @PostMapping("/register")
    public String register(UserInfoDto userDto) {

        userInfoService.register(userDto);
        return "redirect:/testLogin";
    }

    @PostMapping("/checkId") //아이디 중복체크
    public String checkId(@RequestParam("userId")String userId) {

        userInfoService.checkId(userId);
        System.out.println(userInfoService.checkId(userId));
        return "redirect:/testLogin";
    }

    @PostMapping("/sendAuthEmail") //이메일 인증메일 발송
    public String sendAuthEmail(@RequestParam("email") String email) throws Exception {

        String confirm = emailService.sendAuthMessage(email);

        return confirm;
    }

    @PutMapping("/findPassword") //비밀번호 찾기
    public String findPassword(@RequestParam("userId") String userId) throws Exception {

        passwordService.sendTempPassword(userId);
        return userId;
    }

    @PutMapping("/updatePassword") //비밀번호 변경
    public String updatePassword(@RequestParam("userId") String userId, @RequestParam("newPassword") String newPassword) throws Exception {

        passwordService.updatePassword(userId, newPassword);
        return userId;
    }

    @PutMapping("/updateProfile") //비밀번호 변경
    public String updateProfile(@RequestBody UserProfileDto userProfileDto) throws Exception {
        userInfoService.updateProfile(userProfileDto);
        return userProfileDto.getNickname();
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
