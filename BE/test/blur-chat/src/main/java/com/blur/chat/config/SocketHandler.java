package com.blur.chat.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.blur.chat.api.entity.Chat;
import com.blur.chat.api.entity.Chatroom;
import com.blur.chat.api.service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class SocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.info("payload {}", payload);
        Chat chat = objectMapper.readValue(payload, Chat.class);
        Chatroom room = chatService.findRoomById(chat.getRoomNo());
        room.handleActions(session, chat, chatService);
    }
}

 