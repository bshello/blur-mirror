package com.blur.business.service;

import org.springframework.stereotype.Service;

import com.blur.business.api.dto.TokenDto;
import com.blur.business.entity.Token;
import com.blur.business.repository.TokenRepository;
import com.blur.business.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenService{
	private final TokenRepository tokenRepository;
	
	public void saveRefreshToken(Token token) throws Exception {
		tokenRepository.save(token);
	}

//	public String getRefreshToken(String userId) throws Exception {
//		return tokenRepository.findByUserId(userId).getRefreshToken();
//	}

	public void deleRefreshToken(String userId) throws Exception {
		tokenRepository.deleteByUserId(userId);
	}
	}
