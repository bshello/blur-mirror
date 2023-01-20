package com.blur.api.controller;

import com.blur.api.dto.request.UserInfoDto;
import com.blur.api.dto.response.EmailAuthDto;
import com.blur.service.EmailService;
import com.blur.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.awt.*;

@Controller
public class UserInfoController {

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    EmailService emailService;

    @GetMapping({ "", "/" })
    public String index() {
        return "index";
    }

    @PostMapping("/register")
    public String register(UserInfoDto userDto) {

        userInfoService.register(userDto);
        return "redirect:/testLogin";
    }

    @PostMapping("/checkId")
    public String checkId(@RequestParam("userId")String userId) {

        userInfoService.checkId(userId);
        System.out.println(userInfoService.checkId(userId));
        return "redirect:/testLogin";
    }

    @PostMapping("/sendAuthEmail")
    public String sendAuthEmail(@RequestParam String email) throws Exception {

        String confirm = emailService.sendSimpleMessage(email);

        return confirm;
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
