package com.blur.blurmatch.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Collection;

@ApiModel(description = "ResponseAcceptDto")
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class ResponseAceeptDto {

    @ApiModelProperty(notes = "파트너 ID")
    private String partnerId;

    @ApiModelProperty(notes = "파트너 관심사")
    private Collection<String> partnerInterests;

    @ApiModelProperty(notes = "세션 ID")
    private String SessionId;


}
