package com.blur.blurprofile.controller;

import com.blur.blurprofile.dto.ProfileDto;
import com.blur.blurprofile.dto.ResponseCard;
import com.blur.blurprofile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/profile/{id}")
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    ProfileService profileService;

    @GetMapping("/test")
    public String test() {
        return "11111111111111111111111111111111111111111111";
    }

    @GetMapping
    public ResponseEntity<ProfileDto> getProfile(@PathVariable("id") String userId) {

        ProfileDto profileDto = profileService.getProfile(userId);
        return ResponseEntity.status(HttpStatus.OK).body(profileDto);
    }

    @PutMapping("/updateProfile") //프로필 변경
    public ResponseEntity<?> updateProfile(@RequestBody ProfileDto profileDto) throws Exception {
        ProfileDto profile= profileService.updateProfile(profileDto);
        return ResponseEntity.status(HttpStatus.OK).body(profile);
    }

    @GetMapping("/getCard")
    public ResponseEntity<ResponseCard> getCard(@PathVariable("id") String userId) {

        ResponseCard responseCard = profileService.getCard(userId);
        return ResponseEntity.status(HttpStatus.OK).body(responseCard);
    }

    @PutMapping("/updateInterest")
    public ResponseEntity<?> updateInterest(@RequestBody ProfileDto.UserInterestDto userInterestDto) throws Exception {
        profileService.updateInterest(userInterestDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
