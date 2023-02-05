package com.blur.chat.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.blur.chat.api.repository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatRoomService {

	public final ChatRoomRepository chatRoomRepository;

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
       return chatRoomRepository.findUsersInWorkSpace(roomNo,sessionId);
    }
}
