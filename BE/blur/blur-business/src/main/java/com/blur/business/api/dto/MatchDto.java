package com.blur.business.api.dto;

import com.blur.business.entity.MatchMakingRating;
import com.blur.business.entity.MatchingSetting;
import com.blur.business.entity.User;
import com.blur.business.entity.UserProfile;
import lombok.*;

import javax.persistence.criteria.CriteriaBuilder;

@NoArgsConstructor
@Getter
@AllArgsConstructor
@Builder
@Setter
public class MatchDto {

    private String userId;

    private String gender;

    private Integer age;

    private Integer mmr;

    private double lat;

    private double lng;

    private Integer maxDistance;

    private Integer minAge ;

    private Integer maxAge;

    public MatchDto(User user, UserProfile userProfile, MatchDto.MatchInfoDto matchInfoDto, MatchingSetting matchingSetting, MatchMakingRating matchMakingRating) {
        this.userId = userProfile.getUserId();
        this.gender = user.getGender();
        this.age = userProfile.getAge();
        this.mmr = matchMakingRating.getMmr();
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




