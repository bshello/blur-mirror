package com.blur.chat.api.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import com.blur.chat.api.entity.Chat;

public interface ChatRepository extends JpaRepository<Chat,Long> {

    Slice<Chat> findAllByCreatedAtBeforeAndChatroomOrderByCreatedAtDesc(String cursorCreatedAt,Long chatroomNo, Pageable pageable);

    List<Chat> findAllByCreatedAtAfterOrderByCreatedAtDesc(String cursorCreatedAt);
}
