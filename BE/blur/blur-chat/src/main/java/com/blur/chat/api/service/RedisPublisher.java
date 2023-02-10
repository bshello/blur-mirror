package com.blur.chat.api.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import com.blur.chat.api.dto.request.ChatMessageSaveDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class RedisPublisher {

    /*
     * redis 발행 서비스
     *
     * */
    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(ChannelTopic topic, ChatMessageSaveDto messageDto) {

        redisTemplate.convertAndSend(topic.getTopic(), messageDto);
    }
}