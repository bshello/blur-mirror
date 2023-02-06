package com.blur.blurprofile.service;

import com.blur.blurprofile.dto.ProfileDto;
import com.blur.blurprofile.dto.ResponseCard;
import com.blur.blurprofile.entity.Interest;
import com.blur.blurprofile.entity.UserInterest;
import com.blur.blurprofile.entity.UserProfile;
import com.blur.blurprofile.repository.UserInterestRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.blur.blurprofile.repository.UserProfileRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {

    @Autowired
    UserProfileRepository userProfileRepository;

    @Autowired
    UserInterestRepository userInterestRepository;

    public ProfileDto getProfile(String userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        if (userProfile == null) {
            userProfile = UserProfile.builder()
                    .userId(userId)
                    .build();
            userProfileRepository.save(userProfile);
        }
        ProfileDto profileDto = new ProfileDto(userProfile);
        return profileDto;
    }

    public ProfileDto updateProfile(ProfileDto profileDto) {
        UserProfile userProfile = userProfileRepository.findByUserId(profileDto.getUserId());
        userProfile.updateProfile(profileDto.getAge(), profileDto.getNickname(),
                profileDto.getImage(), profileDto.getGender(), profileDto.getIntroduce());
        userProfileRepository.save(userProfile);
        ProfileDto profile = new ModelMapper().map(userProfile, ProfileDto.class);
        return profile;
    }

    public ResponseCard getCard(String userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        if (userProfile == null) {
            userProfile = UserProfile.builder()
                    .userId(userId)
                    .build();
            userProfileRepository.save(userProfile);
        }
        UserInterest userInterest = userInterestRepository.findByUserId(userId);
        if (userInterest == null) {
            userInterest = UserInterest.builder()
                    .userId(userId)
                    .build();
            userInterestRepository.save(userInterest);
        }
        ResponseCard responseCard = new ResponseCard(userProfile, userInterest);
        return responseCard;
    }

    public void updateInterest(ProfileDto.UserInterestDto userInterestDto) {
        UserInterest userInterest = userInterestRepository.findByUserId(userInterestDto.getUserId());
        for(Interest interest : userInterest.getInterest()) {
            userInterest.addInterest(interest);
        }
        userInterestRepository.save(userInterest);
    }
}
