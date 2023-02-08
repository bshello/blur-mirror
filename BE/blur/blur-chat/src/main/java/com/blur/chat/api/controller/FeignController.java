package com.blur.chat.api.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.blur.chat.api.dto.FeignUserDto;
import com.blur.chat.api.service.FeginService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class FeignController {
	
	@Autowired
	private final FeginService feignService;
	RestTemplate restTemplate = new RestTemplate();
	
	 @GetMapping("/test/{userId}")
     public void post(@PathVariable String userId) {
         HashMap<String, String> parameters = new HashMap<>();
//         parameters.add("userId", userId);
         parameters.put("userId", userId);
         System.out.println("test");
		//Test용 로컬 주소
         String url = "http://localhost:8000/blur-auth/user/userInfo/" + userId;
//         ResponseEntity<String> res = new RestTemplate().postForEntity(url, parameters, String.class);
         ResponseEntity<FeignUserDto> res = new RestTemplate().postForEntity(url, parameters, FeignUserDto.class);
//         FeignUserDto feignUserDto = new FeignUserDto(res.getBody(), userId, nickname)
//         System.out.println(res.getBody());
//         System.out.println(res.getStatusCodeValue());
         FeignUserDto feignUserDto = res.getBody();
         Long userNo = feignUserDto.getUserNo();
         String nickname = feignUserDto.getNickname();
         System.out.println("userNo : " + userNo + " " + "nickname : " + nickname);
     }
	
	
	
//	@PostMapping("/test/{userId}")
	@PostMapping(value = "/user/userInfo/{userId}")
	public FeignUserDto test(@PathVariable String userId){
		System.out.println("controller : " + userId);
		FeignUserDto feignUserDto = feignService.getUser(userId);
		System.out.println(feignUserDto.toString());
		return feignService.getUser(userId);
	}
	
	
	
}
