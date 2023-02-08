package com.blur.chat.utils;

import com.blur.chat.exception.FeignNotFoundException;

import feign.Response;
import feign.codec.ErrorDecoder;

public class FeginError implements ErrorDecoder{

	@Override
	public Exception decode(String methodKey, Response response) {
		switch (response.status()) {
        case 404:
            return new FeignNotFoundException();
    }
    return null;
	}
	
}
