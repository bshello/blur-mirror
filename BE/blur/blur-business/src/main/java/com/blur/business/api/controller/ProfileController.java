package com.blur.business.api.controller;

import com.blur.business.api.dto.UserProfileDto;
import com.blur.business.service.PasswordService;
import com.blur.business.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/profile/{id}")
public class ProfileController {

    @Autowired
    PasswordService passwordService;

    @Autowired
    ProfileService profileService;

    @GetMapping
    public UserProfileDto getProfile(@PathVariable("id") String userId) {
    	UserProfileDto userProfileDto = profileService.getProfile(userId);
        return userProfileDto;
    }

    @PutMapping("/updateProfile") //비밀번호 변경
    public void updateProfile(@RequestBody UserProfileDto userProfileDto) throws Exception {
        profileService.updateProfile(userProfileDto);
    }

    @PutMapping("/updatePassword") //비밀번호 변경
    public void updatePassword(@PathVariable("id") String userId, @RequestParam("newPassword") String newPassword) throws Exception {
        passwordService.updatePassword(userId, newPassword);
    }


}
