package com.blur.chat.api.controller;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.blur.chat.api.dto.FeignUserDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class FeignController {
	RestTemplate restTemplate = new RestTemplate();
	
	 @GetMapping("/test/{userId}")
     public FeignUserDto post(@PathVariable String userId) {
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
         return feignUserDto;
     }
	
}
