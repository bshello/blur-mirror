package com.blur.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.blur.userservice.config.properties.AppProperties;
import com.blur.userservice.config.properties.CorsProperties;

@SpringBootApplication
@EnableConfigurationProperties({
    CorsProperties.class,
    AppProperties.class
})
public class BlurUserService1Application {

	public static void main(String[] args) {
		SpringApplication.run(BlurUserService1Application.class, args);
	}

}
