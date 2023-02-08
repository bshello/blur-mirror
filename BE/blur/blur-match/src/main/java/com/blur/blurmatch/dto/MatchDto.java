package com.blur.blurmatch.dto;

import com.blur.blurmatch.entity.MatchMakingRating;
import com.blur.blurmatch.entity.MatchingSetting;
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

    public MatchDto(MatchDto.MatchInfoDto matchInfoDto, MatchingSetting matchingSetting, MatchMakingRating matchMakingRating) {
        this.userId = matchingSetting.getUserId();
        this.gender = user.getGender();
        this.age = userProfile.getAge();
        this.point = matchMakingRating.getPoint();
        this.lat = matchInfoDto.getLat();
        this.lng = matchInfoDto.getLng();
        this.maxDistance = matchingSetting.getMaxDistance();
        this.minAge = matchingSetting.getMinAge();
        this.maxAge = matchingSetting.getMaxAge();
    }

    @NoArgsConstructor
    @Getter
    public static class MatchSettingDto {

        private String userId;

        private Integer maxDistance;

        private Integer minAge ;

        private Integer maxAge;

        public MatchingSetting toEntity() {
            MatchingSetting matchingSetting = MatchingSetting.builder()
                    .userId(userId)
                    .maxDistance(maxDistance)
                    .minAge(minAge)
                    .maxAge(maxAge)
                    .build();
            return matchingSetting;
        }
    }

    @NoArgsConstructor
    @Getter
    public static class MatchInfoDto {

        private String userId;

        private double lat;

        private double lng;

    }
}
