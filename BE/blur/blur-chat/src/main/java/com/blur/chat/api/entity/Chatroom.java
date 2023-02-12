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
//@Builder
@Table(name = "chatroom")
public class Chatroom {

    @Id
    @Column(name = "chatroom_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long chatroomNo;
    
    @Column(name = "man_no")
	private Long manNo;
    
    @Column(name = "woman_no")
    private Long womanNo;
    
    @Column(name = "man_nickname")
	private String manNickname;
    
    @Column(name = "woman_nickname")
    private String womanNickname;
	
	public Chatroom(Long manNo, String manNickname) {
		super();
		this.manNo = manNo;
		this.manNickname = manNickname;
	}
	
//	public Chatroom enterWoman(UserInfoDto userInfoDto, Long chatroomNo) {
//		return builder()
//				.chatroomNo(chatroomNo)
//				.womanNo(userInfoDto.getUserNo())
//				.womanNickname(userInfoDto.getNickname())
//				.build();
//	}
	
	public void update(Long womanNo, String womanNickname) {
		this.womanNo = womanNo;
		this.womanNickname = womanNickname;
	}

	@Override
	public String toString() {
		return "Chatroom [chatroomNo=" + chatroomNo + ", manNo=" + manNo + ", womanNo=" + womanNo + ", manNickname="
				+ manNickname + ", womanNickname=" + womanNickname + "]";
	}
	
	
}
