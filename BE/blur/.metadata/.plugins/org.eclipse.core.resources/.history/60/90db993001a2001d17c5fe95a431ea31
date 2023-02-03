package com.blur.userservice.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.blur.userservice.api.dto.UserDto;
import com.blur.userservice.api.dto.UserProfileDto;
import com.blur.userservice.api.entity.User;
import com.blur.userservice.api.entity.UserProfile;
import com.blur.userservice.api.repository.UserProfileRepository;
import com.blur.userservice.api.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }
    
    @Autowired
    private final UserProfileRepository userProfileRepository;

    @Autowired
    private final BCryptPasswordEncoder encoder;

    public User register(UserDto dto) throws Exception{
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

    public Boolean checkId(String userId) {

        User userEntity = userRepository.findByUserId(userId);
        if (userEntity!=null) {
            return false;
        }
        System.out.println("회원가입가능");
        return true;
    }
}
