package com.blur.api.controller;

import com.blur.auth.PrincipalDetails;
import com.blur.entity.User;
import com.blur.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class UserInfoController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/test/user")
    public @ResponseBody String testUser(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("principalDetails:" + principalDetails.getUser());
        return "user";
    }

    @PostMapping("/register")
    public String register(User user) {
        System.out.println(user);
        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.setPassword(encPassword);
        userRepository.save(user); //이상태로는 비밀번호가 암호화가 안돼서 시큐리티 로그인이 안됨
        return "redirect:/testLogin";
    }

    @GetMapping("/loginForm")
    public String loginForm() {
        return "testLogin";
    }

    @GetMapping("/joinForm")
    public String joinForm() {
        return "testRegister";
    }
}
