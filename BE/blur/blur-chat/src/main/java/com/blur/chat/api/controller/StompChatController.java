package com.blur.chat.api.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import com.blur.chat.api.dto.FeignUserDto;
import com.blur.chat.api.dto.request.ChatMessageSaveDto;
import com.blur.chat.api.service.ChatRedisCacheService;
import com.blur.chat.api.service.RedisPublisher;
import com.blur.chat.api.service.UserInfo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class StompChatController {

    private final RedisPublisher redisPublisher;
    private final ChatRedisCacheService chatRedisCacheService;
    private final ChannelTopic channelTopic;
//    private final HeaderTokenExtractor headerTokenExtractor;
//    private final JwtDecoder jwtDecoder;
    private final UserInfo userInfo;
    
    @MessageMapping("/chat/message/{userId}")
    public void message(ChatMessageSaveDto message, @PathVariable String userId) {
//    public void message(ChatMessageSaveDto message, @Header("token") String token){
//        UserInfo userInfo = jwtDecoder.decodeUsername(headerTokenExtractor.extract(token));
    	System.out.println("test123123");
    	FeignUserDto feignUserDto = userInfo.getUserInfo(userId);
    	System.out.println(feignUserDto.toString());
        message.setNickname(feignUserDto.getNickname());
        message.setWriter(feignUserDto.getUserId());
        message.setType(ChatMessageSaveDto.MessageType.TALK);
        message.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss.SSS")));
        
        redisPublisher.publish(channelTopic, message);
        chatRedisCacheService.addChat(message);
    }

}
