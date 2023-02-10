package com.blur.chat.api.service;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.blur.chat.api.dto.FeignUserDto;

@Service
public class UserInfo {
	private final RestTemplate restTemplate = new RestTemplate();
	HashMap<String, String> parameters = new HashMap<>();
	
	public FeignUserDto getUserInfo(String userId) {
	    parameters.put("userId", userId);
	    String url = "http://localhost:8000/blur-auth/user/userInfo/" + userId;
	    ResponseEntity<FeignUserDto> res = new RestTemplate().postForEntity(url, parameters, FeignUserDto.class);
	    FeignUserDto feignUserDto = res.getBody();
	    System.out.println("getUserInfo : " + feignUserDto.toString());
	    return feignUserDto;
	}
	
}
