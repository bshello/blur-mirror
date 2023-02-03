package com.blur.user.security.provider;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.blur.user.api.entity.User;
import com.blur.user.api.repository.UserRepository;
import com.blur.user.security.UserDetailsImpl;
import com.blur.user.security.jwt.JwtDecoder;
import com.blur.user.security.jwt.UserInfo;

@Component

public class JwtAuthorizationProvider implements AuthenticationProvider {
    private final JwtDecoder jwtDecoder;

    private final UserRepository userRepository;

    @Autowired
    public JwtAuthorizationProvider(JwtDecoder jwtDecoder, UserRepository userRepository){
        this.jwtDecoder=jwtDecoder;
        this.userRepository=userRepository;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String token = (String) authentication.getPrincipal();
        UserInfo userInfo = jwtDecoder.decodeUsername(token);

        User user = userRepository.findByUserId(userInfo.getUserId())
                .orElseThrow(()->new AuthenticationCredentialsNotFoundException("해당 회원정보가 없습니다."));
        UserDetailsImpl userDetails = new UserDetailsImpl(user);

        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
