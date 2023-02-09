package com.blur.blurprofile.service;

import com.blur.blurprofile.dto.CategoryDto;
import com.blur.blurprofile.dto.InterestDto;
import com.blur.blurprofile.dto.ProfileDto;
import com.blur.blurprofile.dto.ResponseCard;
import com.blur.blurprofile.entity.Interest;
import com.blur.blurprofile.entity.UserInterest;
import com.blur.blurprofile.entity.UserProfile;
import com.blur.blurprofile.repository.CategoryRepository;
import com.blur.blurprofile.repository.InterestRepository;
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

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    InterestRepository interestRepository;

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

    public CategoryDto getAllCategories(String userId) {

        CategoryDto categories = new CategoryDto(categoryRepository.findAll());
        return categories;
    }

    public InterestDto getAllInterests(String userId) {

        InterestDto interestDto = new InterestDto(interestRepository.findAll());
        return interestDto;
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
        List<UserInterest> userInterests = userInterestRepository.findByUserProfile(userProfile);
        ResponseCard responseCard = new ResponseCard(userProfile, userInterests);
        return responseCard;
    }

    public void updateInterest(ProfileDto.RequestUserInterestDto requestUserInterestDto, String userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        List<UserInterest> userInterests = userInterestRepository.findByUserProfile(userProfile);
        List<Interest> interests = requestUserInterestDto.getInterests();
        for (Interest interest : interests) {
            UserInterest userInterest = UserInterest.builder()
                    .userProfile(userProfile)
                    .interest(interest)
                    .build();
            userInterestRepository.save(userInterest);
        }
    }
}
