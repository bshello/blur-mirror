package com.blur.chat.api.entity;


import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@AllArgsConstructor
@Builder
public class Chatroom implements Serializable {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;



//    public void update(WorkSpaceUpdateReqeustDto requestDto, String imageUrl) {
//
//        if(requestDto.getContent()!=null){
//            this.content = requestDto.getContent();
//        }
//
//        if(requestDto.getTitle()!=null){
//            this.title = requestDto.getTitle();
//        }
//
//        this.imageUrl = imageUrl;
//    }


}
