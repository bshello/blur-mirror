package com.blur.chat.api.entity;

import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Table(name = "chatroom")
public class Chatroom {
	private Long chatroomNo;
	private Long userNo;
}
