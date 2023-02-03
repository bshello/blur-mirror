package com.blur.userservice.api.service;

import org.springframework.stereotype.Service;

import com.blur.userservice.api.entity.User;
import com.blur.userservice.api.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }
}
