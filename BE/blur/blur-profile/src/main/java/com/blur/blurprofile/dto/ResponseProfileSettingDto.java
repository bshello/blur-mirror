package com.blur.blurprofile.dto;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
public class ResponseProfileSettingDto {

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

    public ResponseProfileSettingDto(ProfileDto profileDto, MatchSettingDto matchSettingDto) {
        this.userId = profileDto.getUserId();
        this.age = profileDto.getAge();
        this.nickname = profileDto.getNickname();
        this.image = profileDto.getImage();
        this.gender = profileDto.getGender();
        this.introduce = profileDto.getIntroduce();
        this.mbti = profileDto.getMbti();
        this.maxDistance = matchSettingDto.getMaxDistance();
        this.minAge = matchSettingDto.getMinAge();
        this.maxAge = matchSettingDto.getMaxAge();
    }
}
