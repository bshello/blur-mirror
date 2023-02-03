package com.blur.user.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

import com.blur.user.api.dto.ResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class AccessDeniedHandler implements org.springframework.security.web.access.AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {

        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().println(
                new ObjectMapper().writeValueAsString(
                        ResponseDto.fail("AUTHORIZE_FAIL", accessDeniedException.getMessage())
                )
        );
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
