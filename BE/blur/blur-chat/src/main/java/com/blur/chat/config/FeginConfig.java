package com.blur.chat.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import com.blur.chat.utils.FeginError;

import feign.Logger;
import feign.codec.ErrorDecoder;

@EnableFeignClients("com.blur.chat")
public class FeginConfig {
	
    @Bean
    Logger.Level FeignClientLoggerLevel() {
        return Logger.Level.FULL;
    }

    @Bean
    public ErrorDecoder errorDecoder() {
        return new FeginError();
    }
}
