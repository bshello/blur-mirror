package com.blur.chat.api.dto.request;


import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class ChatPagingDto {
	@ApiModelProperty(value = "message", example = "message", required=true)
    private String message;
	@ApiModelProperty(value = "writer", example = "writer", required=true)
    private String writer;
	@ApiModelProperty(value = "cursor", example = "cursor", required=true)
    private String cursor;
}
