package com.blur.userservice.api.service;

import com.blur.userservice.api.entity.UserProfile;
import com.blur.userservice.api.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.blur.userservice.api.dto.UserProfileDto;

@Service
@RequiredArgsConstructor
public class ProfileService {

    @Autowired
    UserProfileRepository userProfileRepository;

    public UserProfileDto getProfile(String userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        UserProfileDto userProfileDto = new UserProfileDto(userProfile);
        return userProfileDto;
    }

    public void updateProfile(UserProfileDto userProfileDto) {
        UserProfile userProfile = userProfileRepository.findByUserId(userProfileDto.getUserId());
        userProfile.updateProfile(userProfileDto.getAge(), userProfileDto.getGender(), userProfileDto.getNickname(), userProfileDto.getImage());
        userProfileRepository.save(userProfile);

    }
}
