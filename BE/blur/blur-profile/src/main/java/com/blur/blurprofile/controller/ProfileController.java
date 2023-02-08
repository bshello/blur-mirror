package com.blur.blurprofile.controller;

import com.blur.blurprofile.dto.CategoryDto;
import com.blur.blurprofile.dto.InterestDto;
import com.blur.blurprofile.dto.ProfileDto;
import com.blur.blurprofile.dto.ResponseCard;
import com.blur.blurprofile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/profile/{id}")
public class ProfileController {

    @Autowired
    ProfileService profileService;

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

    @GetMapping("/getAllInterests")
    public ResponseEntity<?> getAllInterests(@PathVariable("id") String userId) throws Exception {
        Collection<InterestDto> interests = profileService.getAllInterests(userId);
        return ResponseEntity.status(HttpStatus.OK).body(interests);
    }

    @GetMapping("/getAllCategories")
    public ResponseEntity<?> getAllCategories(@PathVariable("id") String userId) throws Exception {
        Collection<CategoryDto> categories = profileService.getAllCategories(userId);
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }

    @GetMapping("/{categoryName}")
    public ResponseEntity<?> getInterestByCategory(@PathVariable("categoryName") String categoryName) throws Exception {
        Collection<InterestDto> interests = profileService.getInterestByCategory(categoryName);
        return ResponseEntity.status(HttpStatus.OK).body(interests);
    }

    @PutMapping("/updateInterest")
    public ResponseEntity<?> updateInterest(@RequestBody ProfileDto.UserInterestDto userInterestDto) throws Exception {
        profileService.updateInterest(userInterestDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }



}
