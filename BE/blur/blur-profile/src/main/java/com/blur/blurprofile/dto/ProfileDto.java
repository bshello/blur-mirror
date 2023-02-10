package com.blur.blurprofile.dto;

import com.blur.blurprofile.entity.Interest;
import com.blur.blurprofile.entity.UserInterest;
import com.blur.blurprofile.entity.UserProfile;
import lombok.*;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class ProfileDto {

    private String userId;

    private Integer age;

    private String nickname;

    private String image;

    private String gender;

    private String introduce;

    private String mbti;

    @NoArgsConstructor
    @Getter
    @Setter
    public static class RequestUserInterestDto {

        private List<Interest> Interests;

        public RequestUserInterestDto(List<Interest> interests) {
            this.Interests = interests;
        }
    }
}
