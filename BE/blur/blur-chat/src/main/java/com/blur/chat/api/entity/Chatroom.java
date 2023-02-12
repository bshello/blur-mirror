package com.blur.chat.api.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.blur.chat.api.dto.UserInfoDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "chatroom")
public class Chatroom {

    @Id
    @Column(name = "chatroom_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long chatroomNo;
    
    @Column(name = "user_no")
	private Long userNo;
    
    @Column(name = "nickname")
	private String nickname;
	
	public Chatroom(Long userNo, String nickname) {
		super();
		this.userNo = userNo;
		this.nickname = nickname;
	}
}
