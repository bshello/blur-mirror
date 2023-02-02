package com.blur.user.api.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserProfileDto {

    private String profileImageUrl;
    private String nickname;
}
