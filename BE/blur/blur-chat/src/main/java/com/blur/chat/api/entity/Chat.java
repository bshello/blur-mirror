package com.blur.chat.api.entity;

import java.io.Serializable;

import javax.persistence.*;

import org.springframework.data.annotation.Id;

import com.blur.chat.api.dto.ChatMessageSaveDto;

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
@Table(name = "chats")
public class Chat implements Serializable {

    private static final long serialVersionUID = 5090380600159441769L;


    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long messagNo;

    private String message;

    private String users;

    private String createdAt;

    private Long roomNo;

    public static Chat of(ChatMessageSaveDto chatMessageSaveDto, WorkSpace workSpace){

        return Chat.builder()
                .message(chatMessageSaveDto.getMessage())
                .createdAt(chatMessageSaveDto.getCreatedAt())
                .users(chatMessageSaveDto.getWriter())
                .workSpace(workSpace)
                .build();


    }
}
