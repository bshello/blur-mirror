package com.blur.chat.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.blur.chat.api.dto.ResponseDto;
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
    
    public String createChatroom(Long userNo){
    	Chatroom chatroom = new Chatroom(userNo);
//    	System.out.println(chatroom.toString());
    	chatRoomNoRepository.save(chatroom);
    	String chatroomNo = chatroom.getChatroomNo().toString();
//    	System.out.println("createChatroom : " + chatroomNo.toString());
    	
    	return chatroomNo;
    }
    
    public List<Chatroom> getRooms(Long userNo){
    	List<Chatroom> result = chatRoomNoRepository.findByUserNo(userNo);
    	return result;
    }
}
