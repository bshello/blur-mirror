package com.blur.chat.api.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.blur.chat.api.dto.UserInfoDto;
import com.blur.chat.api.dto.request.ChatMessageSaveDto;
import com.blur.chat.api.service.ChatRedisCacheService;
import com.blur.chat.api.service.RedisPublisher;
import com.blur.chat.api.service.UserInfo;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
@Api(value = "채팅 API", tags = {"blur-chat"})
public class StompChatController {

    private final RedisPublisher redisPublisher;
    private final ChatRedisCacheService chatRedisCacheService;
    private final ChannelTopic channelTopic;
//    private final HeaderTokenExtractor headerTokenExtractor;
//    private final JwtDecoder jwtDecoder;
    private final UserInfo userInfo;
    
    @MessageMapping("/chat/message")
    @ApiResponses(value= {
            @ApiResponse(code = 200, message = "SUCCESS", response = ApiResponse.class),
            @ApiResponse(code = 400, message = "NOT FOUND"),
            @ApiResponse(code = 500, message = "서버오류"),
        })
    public void message(ChatMessageSaveDto message, @Header("userId") String userId) {
//    public void message(ChatMessageSaveDto message, @Header("token") String token){
//        UserInfo userInfo = jwtDecoder.decodeUsername(headerTokenExtractor.extract(token));
//    	System.out.println("test123123");
    	UserInfoDto userInfoDto = userInfo.getUserInfo(userId);
//    	System.out.println(feignUserDto.toString());
        message.setNickname(userInfoDto.getNickname());
        message.setNickname(userInfoDto.getNickname());
        message.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss.SSS")));
        
        redisPublisher.publish(channelTopic, message);
        chatRedisCacheService.addChat(message);
    }

}
