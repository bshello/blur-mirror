package com.blur.business.service;

import com.blur.business.api.dto.UserProfileDto;
import com.blur.business.entity.User;
import com.blur.business.entity.UserProfile;
import com.blur.business.repository.UserProfileRepository;
import com.blur.business.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        userProfile.updateProfile(userProfileDto.getBirthyear(), userProfileDto.getNickname(), userProfileDto.getImage());
        userRepository.save(user);
        userProfileRepository.save(userProfile);

    }
}
