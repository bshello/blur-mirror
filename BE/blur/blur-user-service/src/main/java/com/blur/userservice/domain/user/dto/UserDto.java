package com.blur.userservice.domain.user.dto;

import com.blur.userservice.domain.user.entity.AuthType;

import lombok.Getter;

@Getter
public abstract class UserDto {
    private Long id;
    private String email;
    private String password;
//    private String name;
    private String gender;
    private String dtype;
    private AuthType authType;
    
	public UserDto(Long id, String email, String password, String gender, String dtype,
			AuthType authType) {
		this.id = id;
		this.email = email;
		this.password = password;
//		this.name = name;
		this.gender = gender;
		this.dtype = dtype;
		this.authType = authType;
	}

    
    // == 생성 메소드 == //
//    public UserDto(Customer customer) {
//        this.id = customer.getId();
//        this.email = customer.getEmail();
//        this.password = customer.getPassword();
//        this.name = customer.getName();
//        this.phoneNumber = customer.getPhoneNumber();
//    }

	
}
