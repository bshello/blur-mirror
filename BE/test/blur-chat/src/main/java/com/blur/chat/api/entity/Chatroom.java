package com.blur.chat.api.entity;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import com.blur.chat.api.service.ChatService;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Chatroom {
    private String roomId;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public Chatroom(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }

    public void handleActions(WebSocketSession session, Chat chat, ChatService chatService) {
        if (chat.getType().equals(Chat.MessageType.ENTER)) {
            sessions.add(session);
            chat.setMessage(chat.getNickname() + "님이 입장했습니다.");
        }
        sendMessage(chat, chatService);
    }

    public <T> void sendMessage(T message, ChatService chatService) {
        sessions.parallelStream().forEach(session -> chatService.sendMessage(session, message));
    }
}
