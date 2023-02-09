package com.blur.auth.api.entity;

import javax.persistence.Id;

import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@RedisHash(value = "email_auth")
public class EmailAuth {

    @Id
//    private Long tempNo;
    private String email;
    private String authKey;
    
}
