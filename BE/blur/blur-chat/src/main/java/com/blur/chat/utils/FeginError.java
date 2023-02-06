package com.blur.chat.utils;

import feign.Response;
import feign.codec.ErrorDecoder;

public class FeginError implements ErrorDecoder{

	@Override
	public Exception decode(String methodKey, Response response) {
		switch (response.status()) {
        case 404:
            return new GithubUserNotFoundException();
    }
    return null;
	}
	
}
