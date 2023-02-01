package com.blur.business.api.dto;

import com.blur.business.entity.EmailAuth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class EmailAuthDto {

    private Long tempNo;

    private String authKey;


    public EmailAuth toEntity(String authKey) {
        this.authKey = authKey;
        EmailAuth emailAuth = EmailAuth.builder()
                .authKey(authKey)
                .build();
        return emailAuth;
    }
}
