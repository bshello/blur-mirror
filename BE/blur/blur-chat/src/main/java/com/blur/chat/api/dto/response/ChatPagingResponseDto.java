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

	private Long roomNo;
	private String sessionId;
    private String nickname;
    private String message;
    private String createdAt;

    public static ChatPagingResponseDto of(Chat chat){
        return ChatPagingResponseDto.builder()
        		.roomNo(chat.getChatroom().getRoomNo())
                .nickname(chat.getUsers())
                .sessionId(chat.getChatroom().getSessionId())
                .createdAt(chat.getCreatedAt())
                .message(chat.getMessage())
                .build();
    }

    public static ChatPagingResponseDto byChatMessageDto(ChatMessageSaveDto chatMessageSaveDto){
        return ChatPagingResponseDto.builder()
        		.roomNo(Long.parseLong(chatMessageSaveDto.getRoomNo()))
                .nickname(chatMessageSaveDto.getNickname())
                .createdAt(chatMessageSaveDto.getCreatedAt())
                .sessionId(chatMessageSaveDto.getSessionId())
                .message(chatMessageSaveDto.getMessage())
                .build();
    }
	
//    private Long chatroomNo;
//    private String writer;
//    private String message;
//    private String createdAt;
//    private String nickname;
//
//    public static ChatPagingResponseDto of(Chat chat){
//        return ChatPagingResponseDto.builder()
//                .writer(chat.getUsers())
//                .chatroomNo(chat.getChatroom().getChatroomNo())
//                .createdAt(chat.getCreatedAt())
//                .message(chat.getMessage())
//                .build();
//    }
//
//    public static ChatPagingResponseDto byChatMessageDto(ChatMessageSaveDto chatMessageSaveDto){
//        return ChatPagingResponseDto.builder()
//                .writer(chatMessageSaveDto.getWriter())
//                .createdAt(chatMessageSaveDto.getCreatedAt())
//                .chatroomNo(Long.parseLong(chatMessageSaveDto.getRoomNo()))
//                .message(chatMessageSaveDto.getMessage())
//                .build();
//    }
}
