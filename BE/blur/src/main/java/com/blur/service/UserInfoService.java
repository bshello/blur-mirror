package com.blur.service;

import com.blur.api.dto.request.UserInfoDto;
import com.blur.api.dto.request.UserProfileDto;
import com.blur.entity.User;

import com.blur.entity.UserProfile;
import com.blur.repository.UserProfileRepository;
import com.blur.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;


@Service
@RequiredArgsConstructor
public class UserInfoService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final UserProfileRepository userProfileRepository;

    @Autowired
    private final BCryptPasswordEncoder encoder;

    public void register(UserInfoDto dto) {
        User user = dto.toEntity();
        user.updatePassword(encoder.encode(dto.getPassword()));
        UserProfile userProfile = new UserProfile();
        userProfile.setUser(user);
        userRepository.save(user);
        userProfileRepository.save(userProfile);
        System.out.println("DB에 회원 저장 성공");

    }

    public Integer checkId(@RequestParam("userId")String userId) {
        User userEntity = userRepository.findByUserId(userId);
        if (userEntity!=null) {
            System.out.println("아이디 있음, 회원가입 불가");
            return 1;
        }
        System.out.println("회원가입가능");
        return 0;
    }

    public void updateProfile(UserProfileDto userProfileDto) {
        User user = userRepository.findByUserNo(userProfileDto.getUserNo());
        UserProfile userProfile = userProfileRepository.findByUserNo(userProfileDto.getUserNo());
        user.updateGender(userProfileDto.getGender());
        userProfile.update(userProfileDto.getBirthyear(), userProfileDto.getNickname(), userProfileDto.getImage());
        userRepository.save(user);
        userProfileRepository.save(userProfile);

    }



}
