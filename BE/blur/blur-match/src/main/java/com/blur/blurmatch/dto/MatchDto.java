package com.blur.blurmatch.dto;

import com.blur.blurmatch.dto.request.RequestMatchDto;
import com.blur.blurmatch.entity.MatchMakingRating;
import com.blur.blurmatch.entity.MatchSetting;
import lombok.*;

@NoArgsConstructor
@Getter
@AllArgsConstructor
@Builder
@Setter
public class MatchDto {

    private String userId;

    private String gender;

    private Integer age;

    private Integer point;

    private double lat;

    private double lng;

    private Integer maxDistance;

    private Integer minAge ;

    private Integer maxAge;

    public MatchDto(RequestMatchDto matchInfoDto, MatchSetting matchingSetting, MatchMakingRating matchMakingRating) {
        this.userId = matchingSetting.getUserId();
        this.gender = userProfile.getGender();
        this.age = userProfile.getAge();
        this.point = matchMakingRating.getPoint();
        this.lat = matchInfoDto.getLat();
        this.lng = matchInfoDto.getLng();
        this.maxDistance = matchingSetting.getMaxDistance();
        this.minAge = matchingSetting.getMinAge();
        this.maxAge = matchingSetting.getMaxAge();
    }

}
