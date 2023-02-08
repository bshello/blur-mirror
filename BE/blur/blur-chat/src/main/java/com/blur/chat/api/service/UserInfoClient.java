package com.blur.chat.api.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.blur.chat.api.dto.FeignUserDto;
import com.blur.chat.config.FeginConfig;

@FeignClient(name = "feginClient", contextId = "UserInfoClient", url = "http://localhost:8000/blur-auth", configuration = FeginConfig.class)
public interface UserInfoClient {
	
	@RequestMapping(method = RequestMethod.POST, value = "/userInfo/{userId}")
//	@GetMapping("/userInfo/{userId}")
	FeignUserDto getUser(@PathVariable("userId") String userId);
}
