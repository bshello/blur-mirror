package com.blur.user.api.entity;


import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.blur.user.api.dto.request.SignupDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
@Table(name="users")
public class User {

//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Id
//    private Long id;
//
//    @Column(nullable = false)
//    private String username;
//
//    @JsonIgnore
//    @Column(nullable = false)
//    private String password;
//
//    @Column(nullable = false)
//    private String nickname;
//
//    @Column
//    private String profileImage;
//
//    @Column(nullable = false)
//    @Enumerated(value = EnumType.STRING)
//    private UserSocialEnum social;
//
//    @Column
//    private Long kakaoId;
	
	private Integer userNo;
	
	private String userId;
	
	private String password;
	
	private String email;
	
	private ProviderType social;

    public static User of(SignupDto signupDto, BCryptPasswordEncoder passwordEncoder){
        return User.builder()
                .password(passwordEncoder.encode(signupDto.getPassword()))
                .social(ProviderType.LOCAL)
                .build();
    }
}