package com.blur.blurprofile.dto;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
public class RequestProfileSettingDto {

    private String userId;

    private Integer age;

    private String nickname;

    private String image;

    private String gender;

    private String introduce;

    private String mbti;

    private Integer maxDistance;

    private Integer minAge ;

    private Integer maxAge;
}
