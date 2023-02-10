package com.blur.blurprofile.dto;

import com.blur.blurprofile.entity.Interest;
import com.blur.blurprofile.entity.UserInterest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class InterestDto {

    List<Interest> interests;

    List<UserInterest> userInterests;

    public InterestDto(List<Interest> interests, List<UserInterest> userInterests) {
        this.interests = interests;
        this.userInterests = userInterests;
    }
}
