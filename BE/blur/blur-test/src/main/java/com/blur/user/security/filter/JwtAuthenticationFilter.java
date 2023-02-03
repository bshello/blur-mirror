package com.blur.user.security.filter;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


//로그인 인증하는 filter
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {



    final private ObjectMapper objectMapper;

    public JwtAuthenticationFilter(final AuthenticationManager authenticationManager){

        super.setAuthenticationManager(authenticationManager);
        objectMapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        UsernamePasswordAuthenticationToken authRequest;

        try{
            JsonNode requestBody = objectMapper.readTree(request.getInputStream());
            String userId = requestBody.get("userId").asText();
            String password = requestBody.get("password").asText();
            authRequest = new UsernamePasswordAuthenticationToken(userId, password);
        }catch (Exception e){

            throw new RuntimeException("userId , password 입력이 필요합니다.(JSON)");
        }

        setDetails(request,authRequest);
        return this.getAuthenticationManager().authenticate(authRequest);
    }



}
