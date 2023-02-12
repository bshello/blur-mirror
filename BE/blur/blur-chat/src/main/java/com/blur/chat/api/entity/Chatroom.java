package com.blur.chat.api.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "chatroom")
public class Chatroom {

    @Id
    @Column(name = "chatroom_no")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long chatroomNo;

    @Column(name = "user_no")
	private Long userNo;
	
	public Chatroom(Long userNo) {
		super();
		this.userNo = userNo;
	}

	@Override
	public String toString() {
		return "Chatroom [chatroomNo=" + chatroomNo + ", userNo=" + userNo + "]";
	}
}
