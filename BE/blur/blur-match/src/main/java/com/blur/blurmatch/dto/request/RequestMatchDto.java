package com.blur.blurmatch.dto.request;


import lombok.*;

@NoArgsConstructor
@Getter
@AllArgsConstructor
@Setter
public class RequestMatchDto {

    private String userId;

    private double lat;

    private double lng;

}
