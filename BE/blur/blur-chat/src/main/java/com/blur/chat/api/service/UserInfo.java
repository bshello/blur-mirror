package com.blur.chat.api.service;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.blur.chat.api.dto.UserInfoDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Service
public class UserInfo {
	private final RestTemplate restTemplate = new RestTemplate();
	HashMap<String, String> parameters = new HashMap<>();
	
	@AllArgsConstructor
	@NoArgsConstructor
	@Getter
	@Setter
	static class Profile {
		private String nickname;
	}
	
	public UserInfoDto getUserInfo(String userId) {
	    parameters.put("userId", userId);
	    String AuthUrl = "http://localhost:8000/blur-auth/user/userInfo/" + userId;
	    ResponseEntity<Long> AuthRes = new RestTemplate().postForEntity(AuthUrl, parameters, Long.class);
	    Long userNo = AuthRes.getBody(); 
	    System.out.println("auth controller : " + userNo);
	    
	    
	    String ProfileUrl = "http://localhost:8000/blur-profile/profile/" + userId + "/service";
	    ResponseEntity<Profile> ProfileRes = new RestTemplate().getForEntity(ProfileUrl, Profile.class, userId);
	    Profile profile = ProfileRes.getBody();
	    System.out.println("profile controller : " + profile.getNickname());
	    UserInfoDto userInfoDto = new UserInfoDto(userNo, userId, profile.getNickname());
	    
	    return userInfoDto;
	}
	
}
