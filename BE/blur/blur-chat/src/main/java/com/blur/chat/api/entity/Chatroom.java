package com.blur.chat.api.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
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
	
	private static final long serialVersionUID = 7318783984914422388L;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "room_no", nullable = false, unique = true)
    private Long roomNo;

    @Column(name = "session_id")
    private String sessionId;

    @Column(name = "user1")
    private String user1;

    @Column(name = "user2")
    private String user2;

    @Column(name = "created_at")
    private String createdAt;

    @JsonManagedReference
    @OneToMany(mappedBy = "chatroom")
    private List<Chat> chats;
	
    public void enterUser(String user2) {
        this.user2 = user2;
    }

	public Chatroom(String user1, String sessionId) {
		this.user1 = user1;
		this.sessionId = sessionId;
	}
    
	
//    @Id
//    @Column(name = "chatroom_no")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long chatroomNo;
//    
//    @Column(name = "man_no")
//	private Long manNo;
//    
//    @Column(name = "woman_no")
//    private Long womanNo;
//    
//    @Column(name = "man_nickname")
//	private String manNickname;
//    
//    @Column(name = "woman_nickname")
//    private String womanNickname;
//	
//	public Chatroom(Long manNo, String manNickname) {
//		super();
//		this.manNo = manNo;
//		this.manNickname = manNickname;
//	}
//	
////	public Chatroom enterWoman(UserInfoDto userInfoDto, Long chatroomNo) {
////		return builder()
////				.chatroomNo(chatroomNo)
////				.womanNo(userInfoDto.getUserNo())
////				.womanNickname(userInfoDto.getNickname())
////				.build();
////	}
//	
//	public void update(Long womanNo, String womanNickname) {
//		this.womanNo = womanNo;
//		this.womanNickname = womanNickname;
//	}
//
//	@Override
//	public String toString() {
//		return "Chatroom [chatroomNo=" + chatroomNo + ", manNo=" + manNo + ", womanNo=" + womanNo + ", manNickname="
//				+ manNickname + ", womanNickname=" + womanNickname + "]";
//	}
	
	
}
