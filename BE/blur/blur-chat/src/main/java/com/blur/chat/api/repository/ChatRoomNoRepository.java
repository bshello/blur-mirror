package com.blur.chat.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blur.chat.api.entity.Chatroom;


public interface ChatRoomNoRepository extends JpaRepository<Chatroom,Long> {
	List<Chatroom> findbyChatrooms(Long userNo);
}

