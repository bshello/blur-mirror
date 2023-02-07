package com.blur.blurmatch.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ResponseMatchDto {

    private String maleId;

    private String femaleId;

    public ResponseMatchDto(String maleId, String femaleId) {
        this.maleId = maleId;
        this.femaleId = femaleId;
    }
}
