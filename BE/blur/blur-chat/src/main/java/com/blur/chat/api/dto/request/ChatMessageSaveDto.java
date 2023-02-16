package com.blur.chat.api.dto.request;

import java.util.List;

import com.blur.chat.api.entity.Chat;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel("ChatMessageSaveDto")
public class ChatMessageSaveDto {
	
	private String roomNo;
	@ApiModelProperty(value = "sessionId", example = "session1")
    private String sessionId;
    private String nickname;
    @ApiModelProperty(value = "message", example = "Hello!")
    private String message;
    private String createdAt;

    public static ChatMessageSaveDto of(Chat chat) {
        return ChatMessageSaveDto.builder()
        		.roomNo(chat.getChatroom().getRoomNo().toString())
                .sessionId(chat.getChatroom().getSessionId())
                .nickname(chat.getUsers())
                .createdAt(chat.getCreatedAt())
                .message(chat.getMessage())
                .build();
    }

    public static ChatMessageSaveDto createChatMessageSaveDto(ChatMessageSaveDto saveDto) {
        return ChatMessageSaveDto.builder()
        		.roomNo(saveDto.getRoomNo().toString())
                .sessionId(saveDto.getSessionId())
                .nickname(saveDto.getNickname())
                .createdAt(saveDto.getCreatedAt())
                .message(saveDto.getMessage())
                .build();
    }
	
//    public enum MessageType{
//        ENTER,TALK,QUIT
//    }
//    
//    private MessageType type;
//    @ApiModelProperty(value = "roomNo", example = "roomNo")
//    private String roomNo;
//    private String writer;
//    private String nickname;
//    @ApiModelProperty(value = "message", example = "message")
//    private String message;
//    private String createdAt;
//    @ApiModelProperty(value = "userList", example = "userList")
//    private List<String> userList;
//
//    public static ChatMessageSaveDto of (Chat chat){
//        return ChatMessageSaveDto.builder()
//                .type(MessageType.TALK)
//                .roomNo(chat.getChatroom().getChatroomNo().toString())
//                .writer(chat.getUsers())
//                .createdAt(chat.getCreatedAt())
//                .message(chat.getMessage())
//                .build();
//    }
//
//    public static ChatMessageSaveDto createChatMessageSaveDto(ChatMessageSaveDto saveDto){
//        return ChatMessageSaveDto.builder()
//                .type(MessageType.TALK)
//                .roomNo(saveDto.getRoomNo())
//                .writer(saveDto.getWriter())
//                .createdAt(saveDto.getCreatedAt())
//                .message(saveDto.getMessage())
//                .build();
//    }

}
