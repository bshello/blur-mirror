package com.blur.blurprofile.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInterestCountDto {
	private Long userInterestCount;
    private String interestName;
}
