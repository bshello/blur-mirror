package com.blur.chat.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	@PostMapping("/test/{userId}")
	public ResponseEntity<?> test(@PathVariable String userId){
		System.out.println(userId);
    	FeignUserDto feignUserDto = feignService.getUser(userId);
		return new ResponseEntity<> (feignUserDto, HttpStatus.OK);
	}
}
