package com.blur.blurmatch.dto;

import lombok.*;

@NoArgsConstructor
@Getter
@AllArgsConstructor
@Builder
@Setter
public class MatchSettingDto {

    private String userId;

    private Integer maxDistance;

    private Integer minAge ;

    private Integer maxAge;

}
