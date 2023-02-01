package com.blur.chat.api.dto;

import java.util.List;

import com.blur.chat.api.entity.Chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageSaveDto {

    public enum MessageType{
        ENTER,TALK,QUIT
    }

    private MessageType type;
    private String roomId;
    private String writer;
    private String nickname;
    private String message;
    private String createdAt;
    private List<String> userList;

    public static ChatMessageSaveDto of (Chat chat){
        return ChatMessageSaveDto.builder()
                .type(MessageType.TALK)
                .roomId(chat.getWorkSpace().getId().toString())
                .writer(chat.getUsers())
                .createdAt(chat.getCreatedAt())
                .message(chat.getMessage())
                .build();
    }

    public static ChatMessageSaveDto createChatMessageSaveDto(ChatMessageSaveDto saveDto){
        return ChatMessageSaveDto.builder()
                .type(MessageType.TALK)
                .roomId(saveDto.getRoomId())
                .writer(saveDto.getWriter())
                .createdAt(saveDto.getCreatedAt())
                .message(saveDto.getMessage())
                .build();
    }

}
