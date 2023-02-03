package com.blur.userservice.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blur.userservice.api.dto.UserProfileDto;
import com.blur.userservice.api.entity.User;
import com.blur.userservice.api.entity.UserProfile;
import com.blur.userservice.api.repository.UserProfileRepository;
import com.blur.userservice.api.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserProfileRepository userProfileRepository;

    public UserProfileDto getProfile(String userId) {
        User User = userRepository.findByUserId(userId);
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        UserProfileDto userProfileDto = new UserProfileDto(User, userProfile);
        return userProfileDto;
    }

    public void updateProfile(UserProfileDto userProfileDto) {
        User user = userRepository.findByUserId(userProfileDto.getUserId());
        UserProfile userProfile = userProfileRepository.findByUserId(userProfileDto.getUserId());
        user.updateGender(userProfileDto.getGender());
        userProfile.updateProfile(userProfileDto.getAge(), userProfileDto.getNickname(), userProfileDto.getImage());
        userRepository.save(user);
        userProfileRepository.save(userProfile);

    }
}
