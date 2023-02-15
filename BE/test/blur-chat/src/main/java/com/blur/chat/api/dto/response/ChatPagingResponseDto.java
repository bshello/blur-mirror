package com.blur.chat.api.dto.response;

import com.blur.chat.api.dto.request.ChatMessageSaveDto;
import com.blur.chat.api.entity.Chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Builder
@Setter
@AllArgsConstructor
public class ChatPagingResponseDto {

    private Long chatroomId;
    private String nickname;
    private String message;
    private String createdAt;

    public static ChatPagingResponseDto of(Chat chat){
        return ChatPagingResponseDto.builder()
                .nickname(chat.getNickname())
                .chatroomId(chat.getChatroom().getId())
                .createdAt(chat.getCreatedAt())
                .message(chat.getMessage())
                .build();
    }

    public static ChatPagingResponseDto byChatMessageDto(ChatMessageSaveDto chatMessageSaveDto){
        return ChatPagingResponseDto.builder()
                .nickname(chatMessageSaveDto.getNickname())
                .createdAt(chatMessageSaveDto.getCreatedAt())
                .chatroomId(Long.parseLong(chatMessageSaveDto.getRoomId()))
                .message(chatMessageSaveDto.getMessage())
                .build();
    }
}
