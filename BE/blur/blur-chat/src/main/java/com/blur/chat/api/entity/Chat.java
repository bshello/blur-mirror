package com.blur.chat.api.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.blur.chat.api.dto.request.ChatMessageSaveDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
@Data
@Table(name = "chat")
public class Chat implements Serializable {

    private static final long serialVersionUID = 5090380600159441769L;


    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long chatNo;

    @Column
    private String message;

    @Column
    private String users;

    @Column
    private String createdAt;

    @ManyToOne
    @JoinColumn(name = "chatroom_no", nullable = false)
    private Chatroom chatroom;

    public static Chat of(ChatMessageSaveDto chatMessageSaveDto, Chatroom chatroom){

        return Chat.builder()
                .message(chatMessageSaveDto.getMessage())
                .createdAt(chatMessageSaveDto.getCreatedAt())
                .users(chatMessageSaveDto.getWriter())
                .chatroom(chatroom)
                .build();


    }
}
