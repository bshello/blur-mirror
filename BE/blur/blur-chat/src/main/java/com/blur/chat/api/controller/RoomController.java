package com.blur.chat.api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blur.chat.api.dto.ResponseDto;
import com.blur.chat.api.entity.Chatroom;
import com.blur.chat.api.service.ChatRoomService;
import com.blur.chat.api.service.UserInfo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("chat")
public class RoomController {
	
	private final ChatRoomService chatRoomService;
	private final UserInfo userInfo;
	
//	@PostMapping("/create/{userId}")
//	public ResponseDto<?> createChatroom(@PathVariable String userId){
//		
//		return null;
//	}
	
	@PostMapping("/create")
	public ResponseDto<?> createChatroom(@RequestBody Map<String, String> user){
		String userId = user.get("userId");
		System.out.println("controller : " + userId);
		Long userNo = userInfo.getUserInfo(userId).getUserNo();
		System.out.println("controller : " + userNo);
		chatRoomService.createChatroom(userNo);
		return ResponseDto.success(userNo) ;
	}
	
	public ResponseDto<?> getRooms(@RequestBody Map<String, String> user) {
		String userId = user.get("userId");
		Long userNo = userInfo.getUserInfo(userId).getUserNo();
		List<Chatroom> result = chatRoomService.getRooms(userNo);
		return ResponseDto.success(result);
	}
}
