package com.blur.chat.exception;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

public class FeignNotFoundException extends NotFoundException{
	public FeignNotFoundException() {
		System.out.println("유저를 찾을 수 없습니다.");
	}
}
