package com.blur.userservice.api.controller;

import com.blur.userservice.api.dto.UserProfileDto;
import com.blur.userservice.api.service.PasswordService;
import com.blur.userservice.api.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> getProfile(@PathVariable("id") String userId) {
    	UserProfileDto res = profileService.getProfile(userId);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PutMapping("/updateProfile") //비밀번호 변경
    public ResponseEntity<?>  updateProfile(@RequestBody UserProfileDto userProfileDto) throws Exception {
        profileService.updateProfile(userProfileDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PutMapping("/updatePassword") //비밀번호 변경
    public ResponseEntity<?>  updatePassword(@PathVariable("id") String userId, @RequestParam("newPassword") String newPassword) throws Exception {
        passwordService.updatePassword(userId, newPassword);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }


}
