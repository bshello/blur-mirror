package com.blur.chat.api.entity;

import lombok.Data;

@Data

public class Chat {
	public enum MessageType {
		ENTER, TALK
	}
	
	private String roomNo;
	private String nickname;
	private String message;
	private MessageType type;
}
