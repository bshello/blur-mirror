package com.blur.chat.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blur.chat.api.entity.Chatroom;

@Repository
public interface ChatRoomNoRepository extends JpaRepository<Chatroom, Long> {
	List<Chatroom> findByUserNo(Long userNo);
} 

