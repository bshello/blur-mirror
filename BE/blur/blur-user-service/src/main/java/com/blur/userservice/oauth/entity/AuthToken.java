package com.blur.userservice.oauth.entity;

import java.security.Key;
import java.util.Date;

import com.blur.userservice.api.entity.User;
import com.blur.userservice.api.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class AuthToken {

    @Getter
    private final String token;
    private final Key key;
    
//    private final UserRepository userRepository;
    
    private static final String AUTHORITIES_KEY = "role";

//    AuthToken(String id, Date expiry, Key key, UserRepository userRepository) {
    AuthToken(String id, Date expiry, Key key) {
        this.key = key;
        this.token = createAuthToken(id, expiry);
//        this.userRepository = userRepository;
    }
    
//    AuthToken(String id, String role, Date expiry, Key key, UserRepository userRepository) {
    AuthToken(String id, String role, Date expiry, Key key) {
        this.key = key;
        this.token = createAuthToken(id, role, expiry);
//        this.userRepository = userRepository;
    }

    private String createAuthToken(String id, Date expiry) {
        return Jwts.builder()
                .setSubject(id)
                .signWith(key, SignatureAlgorithm.HS256)
                .setExpiration(expiry)
                .compact();
    }

    private String createAuthToken(String id, String role, Date expiry) {
//    	User user = userRepository.findByUserId(id);
//    	Integer userNo = user.getUserNo();
    	
//    	Claims claims = Jwts.claims().setSubject(id);
//    	claims.put("userId", id);
//    	claims.put("userNo", userNo);
//    	claims.put(AUTHORITIES_KEY, role);
    	
        return Jwts.builder()
                .setSubject(id)
//                .claim("userNo", userNo)
                .claim(AUTHORITIES_KEY, role)
                .signWith(key, SignatureAlgorithm.HS256)
                .setExpiration(expiry)
                .compact();
    }

    public boolean validate() {
        return this.getTokenClaims() != null;
    }

    public Claims getTokenClaims() {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SecurityException e) {
            log.info("Invalid signature.");
        } catch (MalformedJwtException e) {
            log.info("Invalid token.");
        } catch (ExpiredJwtException e) {
            log.info("Expired token.");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported token.");
        } catch (IllegalArgumentException e) {
            log.info("JWT token compact of handler are invalid.");
        }
        return null;
    }

    public Claims getExpiredTokenClaims() {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            log.info("Expired token.");
            return e.getClaims();
        }
        return null;
    }
}
