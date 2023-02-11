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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("chatroom")
@Api(value = "채팅방 생성 API", tags = {"blur-chat"})
public class RoomController {
	
	private final ChatRoomService chatRoomService;
	private final UserInfo userInfo;
	
//	@PostMapping("/create/{userId}")
//	public ResponseDto<?> createChatroom(@PathVariable String userId){
//		
//		return null;
//	}
	
	@PostMapping("/create")
	@ApiOperation(value = "채팅방 생성", notes = "유저아이디로 채팅방 생성")
    @ApiResponses(value= {
        @ApiResponse(code = 200, message = "SUCCESS", response = ApiResponse.class),
        @ApiResponse(code = 400, message = "NOT FOUND"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	@ApiImplicitParam( name = "userId", value = "userId", required = true, dataType = "string", paramType = "path", defaultValue = "None")
	public ResponseDto<?> createChatroom(@RequestBody 
			@ApiParam(value="유저 아이디 입력", 
			name =  "userId",
		    type = "String",
		    example = "userId",
		    required = true)
			Map<String, String> user){
		String userId = user.get("userId");
//		System.out.println("controller : " + userId);
		Long userNo = userInfo.getUserInfo(userId).getUserNo();
//		System.out.println("controller : " + userNo);
		return ResponseDto.success(chatRoomService.createChatroom(userNo)) ;
	}
	
	@PostMapping("/getRooms")
	@ApiOperation(value = "유저의 채팅방 목록 조회", notes = "유저아이디로 생성된 채팅방 목록 조회")
    @ApiResponses(value= {
        @ApiResponse(code = 200, message = "SUCCESS", response = ApiResponse.class),
        @ApiResponse(code = 400, message = "NOT FOUND"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	@ApiImplicitParam( name = "userId", value = "userId", required = true, dataType = "string", paramType = "path", defaultValue = "None")
	public ResponseDto<?> getRooms(@RequestBody Map<String, String> user) {
		String userId = user.get("userId");
		Long userNo = userInfo.getUserInfo(userId).getUserNo();
		List<Chatroom> result = chatRoomService.getRooms(userNo);
		return ResponseDto.success(result);
	}
}
