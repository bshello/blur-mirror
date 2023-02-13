package com.blur.blurprofile.dto;

import com.blur.blurprofile.entity.Interest;
import com.blur.blurprofile.entity.UserInterest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ApiModel(description = "InterestDto")
public class InterestDto {

    @ApiModelProperty(value = "전체 관심사 목록")
    private List<Interest> interests;

    @ApiModelProperty(value = "사용자 관심사 목록")
    private List<UserInterest> userInterests;

    public InterestDto(List<Interest> interests, List<UserInterest> userInterests) {
        this.interests = interests;
        this.userInterests = userInterests;
    }
}
