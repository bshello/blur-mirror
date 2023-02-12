package com.blur.chat.api.service;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.blur.chat.api.dto.UserInfoDto;

@Service
public class UserInfo {
	private final RestTemplate restTemplate = new RestTemplate();
	HashMap<String, String> parameters = new HashMap<>();
	
	public UserInfoDto getUserInfo(String userId) {
	    parameters.put("userId", userId);
	    String AuthUrl = "http://localhost:8000/blur-auth/user/userInfo/" + userId;
	    ResponseEntity<UserInfoDto> AuthRes = new RestTemplate().postForEntity(AuthUrl, parameters, UserInfoDto.class);
	    UserInfoDto userInfoDto = AuthRes.getBody();
	    
	    String ProfileUrl = "http://localhost:8000/blur-profile/getProfile";
	    ResponseEntity<UserInfoDto> ProfileRes = new RestTemplate().postForEntity(ProfileUrl, parameters, UserInfoDto.class);
	    System.out.println(ProfileRes.toString());
	    userInfoDto = ProfileRes.getBody();
	    
//	    System.out.println("getUserInfo : " + feignUserDto.toString());
	    return userInfoDto;
	}
	
}
