package com.blur.blurprofile.service;

import com.blur.blurprofile.dto.*;
import com.blur.blurprofile.entity.Interest;
import com.blur.blurprofile.entity.UserInterest;
import com.blur.blurprofile.entity.UserProfile;
import com.blur.blurprofile.repository.InterestRepository;
import com.blur.blurprofile.repository.UserInterestRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import com.blur.blurprofile.repository.UserProfileRepository;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserInterestRepository userInterestRepository;

    @Autowired
    private InterestRepository interestRepository;

    @Autowired
    private Environment env;

    @Autowired
    private RestTemplate restTemplate;

    public ResponseCardDto getCard(String userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        if (userProfile == null) {
            userProfile = UserProfile.builder()
                    .userId(userId)
                    .build();
            userProfileRepository.save(userProfile);
        }
        List<UserInterest> userInterests = userInterestRepository.findByUserProfile(userProfile);
        ResponseCardDto responseCardDto = new ResponseCardDto(userProfile, userInterests);
        return responseCardDto;
    }

    public ResponseProfileSettingDto getProfileSetting(String userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        if (userProfile == null) {
            userProfile = UserProfile.builder()
                    .userId(userId)
                    .build();
            userProfileRepository.save(userProfile);
        }
        ProfileDto profileDto = new ModelMapper().map(userProfile, ProfileDto.class);
        String getMatchSettingUrl = String.format(env.getProperty("blur-match.url")) + "/getSetting?userId=" + userId;
        ResponseEntity<MatchSettingDto> response = restTemplate.getForEntity(getMatchSettingUrl, MatchSettingDto.class);
        MatchSettingDto matchSetting = response.getBody();
        ResponseProfileSettingDto responseProfileSettingDto = new ResponseProfileSettingDto(profileDto, matchSetting);
        return responseProfileSettingDto;
    }

    public RequestProfileSettingDto updateProfile(RequestProfileSettingDto requestProfileSettingDto) {
        String userId = requestProfileSettingDto.getUserId();
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        userProfile.updateProfile(requestProfileSettingDto.getAge(), requestProfileSettingDto.getNickname(),
                requestProfileSettingDto.getImage(), requestProfileSettingDto.getGender(), requestProfileSettingDto.getIntroduce());
        userProfileRepository.save(userProfile);
        MatchSettingDto matchSettingDto = new ModelMapper().map(requestProfileSettingDto, MatchSettingDto.class);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<MatchSettingDto> request = new HttpEntity<>(matchSettingDto, headers);
        String updateMatchSettingUrl = String.format(env.getProperty("blur-match.url")) + "/updateSetting";
        System.out.println(updateMatchSettingUrl);
        ResponseEntity<String> response = restTemplate.exchange(updateMatchSettingUrl, HttpMethod.PUT, request, String.class);
        return requestProfileSettingDto;
    }

    public InterestDto getInterests(String userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        InterestDto interestDto = new InterestDto(interestRepository.findAll(),userInterestRepository.findByUserProfile(userProfile));
        return interestDto;
    }

    public void updateInterest(ProfileDto.RequestUserInterestDto requestUserInterestDto, String userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        List<UserInterest> userInterests = userInterestRepository.findByUserProfile(userProfile);
        userInterestRepository.deleteAll(userInterests);
        List<Interest> interests = requestUserInterestDto.getInterests();
        for (Interest interest : interests) {
            UserInterest userInterest = UserInterest.builder()
                    .userProfile(userProfile)
                    .interest(interest)
                    .build();
            userInterestRepository.save(userInterest);
        }
    }

    public ProfileDto getProfile(String userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        if (userProfile == null) {
            userProfile = UserProfile.builder()
                    .userId(userId)
                    .build();
            userProfileRepository.save(userProfile);
        }
        ProfileDto profileDto = new ModelMapper().map(userProfile, ProfileDto.class);
        return profileDto;
    }

    public Collection<String> getPartnerInterest(String partnerId) {
        UserProfile partner = userProfileRepository.findByUserId(partnerId);
        List<UserInterest> partnerInterests = userInterestRepository.findByUserProfile(partner);
        Collection<String> partnerInterestNames = new ArrayList<>();
        for (UserInterest partnerInterest : partnerInterests) {
            partnerInterestNames.add(partnerInterest.getInterest().getInterestName());
        }
        return partnerInterestNames;
    }
}
