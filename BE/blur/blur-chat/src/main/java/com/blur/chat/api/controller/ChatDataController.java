package com.blur.chat.api.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blur.chat.api.dto.ResponseDto;
import com.blur.chat.api.dto.request.ChatPagingDto;
import com.blur.chat.api.dto.response.ChatPagingResponseDto;
import com.blur.chat.api.service.ChatRedisCacheService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

//@Api(tags = "Chat")
@Slf4j
@RequiredArgsConstructor
@RestController
@Api(value = "채탱내용 조회 API", tags = {"blur-chat"})
public class ChatDataController {

	private final ChatRedisCacheService cacheService;

//    @ApiOperation(value = "채팅", notes = "채팅 cursor paging 을 통해 조회하기")
	@PostMapping("/chats/{roomNo}")
	@ApiOperation(value = "채팅내용 조회", notes = "채팅 내용 조회")
    @ApiResponses(value= {
        @ApiResponse(code = 200, message = "SUCCESS", response = ApiResponse.class),
        @ApiResponse(code = 400, message = "NOT FOUND"),
        @ApiResponse(code = 500, message = "서버오류"),
    })
	@ApiImplicitParam( name = "roomNo", value = "roomNo", required = true, dataType = "string", paramType = "path", defaultValue = "None")
	public ResponseDto<List<ChatPagingResponseDto>> getChatting(@PathVariable(name ="roomNo") Long roomNo,
			@RequestBody(required = false) @ApiParam(value="채팅 페이지 정보", required = false) ChatPagingDto chatPagingDto) {

		// Cursor 존재하지 않을 경우,현재시간을 기준으로 paging
		if (chatPagingDto == null || chatPagingDto.getCursor() == null || chatPagingDto.getCursor().equals("")) {
			chatPagingDto = ChatPagingDto.builder()
					.cursor(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss.SSS"))).build();
		}
		return cacheService.getChatsFromRedis(roomNo, chatPagingDto);
	}
	
	
}
