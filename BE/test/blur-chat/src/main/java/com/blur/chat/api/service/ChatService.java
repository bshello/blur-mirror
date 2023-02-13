package com.blur.chat.api.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.blur.chat.api.entity.Chatroom;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {

    private final ObjectMapper objectMapper;
    private Map<String, Chatroom> chatrooms;

    @PostConstruct
    private void init() {
        chatrooms = new LinkedHashMap<>();
    }

    public List<Chatroom> findAllRoom() {
        return new ArrayList<>(chatrooms.values());
    }

    public Chatroom findRoomById(String roomId) {
        return chatrooms.get(roomId);
    }

    public Chatroom createRoom(String name) {
        String randomId = UUID.randomUUID().toString();
        Chatroom chatRoom = Chatroom.builder()
                .roomId(randomId)
                .name(name)
                .build();
        chatrooms.put(randomId, chatRoom);
        return chatRoom;
    }

    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}
