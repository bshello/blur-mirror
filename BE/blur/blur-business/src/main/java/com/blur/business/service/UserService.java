package com.blur.business.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.blur.business.api.dto.UserDto;
import com.blur.business.api.dto.UserProfileDto;
import com.blur.business.entity.User;
import com.blur.business.entity.UserProfile;
import com.blur.business.repository.UserProfileRepository;
import com.blur.business.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final UserProfileRepository userProfileRepository;

    @Autowired
    private final BCryptPasswordEncoder encoder;

    public User register(UserDto dto) {
        User user = dto.toEntity();
        user.updatePassword(encoder.encode(dto.getPassword()));
        userRepository.save(user);
        UserProfileDto userProfileDto = new UserProfileDto();
        UserProfile userProfile = userProfileDto.toEntity(user);
        userProfile.setUser(user);
        userProfileRepository.save(userProfile);
        System.out.println("DB에 회원 저장 성공");
        return user;

    }

    public Integer checkId(@RequestParam("UserId")String userId) {
        User userEntity = userRepository.findByUserId(userId);
        if (userEntity!=null) {
            System.out.println("아이디 있음, 회원가입 불가");
            return 1;
        }
        System.out.println("회원가입가능");
        return 0;
    }







}
