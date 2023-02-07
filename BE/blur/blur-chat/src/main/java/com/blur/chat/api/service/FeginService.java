package com.blur.chat.api.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blur.chat.api.dto.FeignUserDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor

public class FeginService {
	private final UserInfoClient userInfoClient;
	
	public FeignUserDto getUser(String userId) {
//		FeignUserDto feignUserDto
		System.out.println("service : " + userId);
		FeignUserDto feignUserDto = userInfoClient.getUser(userId);
		return feignUserDto;
	}
	
}
