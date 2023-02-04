package com.blur.chat.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ChatRoomDto implements Serializable {

    private static final long serialVersionUID =  6494678977089006639L;

    private Long roomNo;
}