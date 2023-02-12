package com.blur.chat.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.blur.chat.api.dto.ResponseDto;
import com.blur.chat.api.dto.UserInfoDto;
import com.blur.chat.api.entity.Chatroom;
import com.blur.chat.api.repository.ChatRoomNoRepository;
import com.blur.chat.api.repository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatRoomService {

	public final ChatRoomRepository chatRoomRepository;
	public final ChatRoomNoRepository chatRoomNoRepository;

	public void enterChatRoom(String roomNo, String sessionId, String username) {
		chatRoomRepository.enterChatRoom(roomNo, sessionId, username);
	}

	public String disconnectWebsocket(String sessionId) {
		return chatRoomRepository.disconnectWebsocket(sessionId);
	}

	public String leaveChatRoom(String sessionId) {
		return chatRoomRepository.leaveChatRoom(sessionId);
	}

    public List<String> findUser(String roomNo,String sessionId){
       return chatRoomRepository.findUsersInChatroom(roomNo,sessionId);
    }
    
    public Long createChatroom(UserInfoDto userInfoDto){
    	Chatroom chatroom = new Chatroom(userInfoDto.getUserNo(), userInfoDto.getNickname());
    	System.out.println(chatroom.toString());
    	chatRoomNoRepository.save(chatroom);
    	Long chatroomNo = chatroom.getChatroomNo();
    	System.out.println("createChatroom : " + chatroomNo);
    	
    	return chatroomNo;
    }
    
    public List<Chatroom> enterChatroom(UserInfoDto userInfoDto, Long chatroomNo){
    	Chatroom chatroom = new Chatroom(chatroomNo, userInfoDto.getUserNo(), userInfoDto.getNickname());
//    	System.out.println(chatroom.toString());
    	chatRoomNoRepository.save(chatroom);
//    	System.out.println("createChatroom : " + chatroomNo.toString());
    	List<Chatroom> result = chatRoomNoRepository.findByChatroomNo(chatroomNo);
    	return result;
    }
    
    public List<Chatroom> getRooms(Long userNo){
    	List<Chatroom> result = chatRoomNoRepository.findByUserNo(userNo);
    	return result;
    }
}
