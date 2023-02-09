package com.blur.blurprofile.dto;

import com.blur.blurprofile.entity.Category;
import com.blur.blurprofile.entity.Interest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class InterestDto {

    List<Interest> interests;

    public InterestDto(List<Interest> interests) {
        this.interests = interests;
    }


}
