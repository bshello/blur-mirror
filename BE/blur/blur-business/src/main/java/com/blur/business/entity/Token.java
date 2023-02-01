package com.blur.business.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "token")
public class Token {
//	@JsonIgnore
//	@Id
//	@Column(name = "User_no")
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	Long UserNo;
	
	@Id
    @Column(name = "user_id", nullable = false, length = 255, unique = true)
    private String userId;

	@Column(name = "refresh_token", length = 255)
	private String refreshToken;
	

    public static Token createToken(String userId, String refreshToken){
        return new Token(userId, refreshToken);
    }

    public void changeToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
