package com.blur.business.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blur.business.repository.UserRepository;
import com.blur.business.service.JwtServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
//	private final Logger logger = LoggerFactory.getLogger(AuthController.class);
//	private static final String SUCCESS = "success";
//	private static final String FAIL = "fail";
//
//	private final JwtServiceImpl jwtservice;
//	private final AuthenticationManager authenticationManager;
//	private final UserRepository UserRepository;

//	@PostMapping("/socialLogin")
//	public ApiResponse socialLogin(@RequestBody LoginRequestDto loginRequestDto) {
//		
//		Authentication authentication = authenticationManager.authenticate(
//			new UsernamePasswordAuthenticationToken(loginRequestDto.getUserId(), loginRequestDto.getPassword())
//		);
//				
//		String UserId = loginRequestDto.getUserId();
//		SecurityContextHolder.getContext().setAuthentication(authentication);
//		
//		Date now = new Date();
//		
//		System.out.println(loginRequestDto.toString());
//		
//		try {
//			LoginRequestDto loginUser = userservice.login(loginRequestDto);
//			if (loginUser != null) {
//				String accessToken = jwtservice.createAccessToken("Userid", loginRequestDto.getUserId());// key, data
//				String refreshToken = jwtservice.createRefreshToken("Userid", loginRequestDto.getUserId());// key, data
//				userservice.saveRefreshToken(loginRequestDto.getUserId(), refreshToken);
//				logger.debug("로그인 accessToken 정보 : {}", accessToken);
//				logger.debug("로그인 refreshToken 정보 : {}", refreshToken);
//				resultMap.put("access-token", accessToken);
//				resultMap.put("refresh-token", refreshToken);
//				resultMap.put("message", SUCCESS);
//				status = HttpStatus.ACCEPTED;
//			} else {
//				resultMap.put("message", FAIL);
//				status = HttpStatus.ACCEPTED;
//			}
//		} catch (Exception e) {
//			logger.error("로그인 실패 : {}", e);
//			resultMap.put("message", e.getMessage());
//			status = HttpStatus.INTERNAL_SERVER_ERROR;
//		}
//		return ApiResponse.success("token", accessToken.getToken());
//	}
//	
	/**
	 * 로그인 JWT 발급
	 * 
	 * @param UserInfo {UserId, password}
	 * @return
	 */
//	@PostMapping("/login")
//	public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto) {
//		Map<String, Object> resultMap = new HashMap<>();
//		HttpStatus status = null;
//		User User = UserRepository.findByUserId(loginRequestDto.getUserId());
//		if (User == null) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(
//					messageSource.getMessage("error.none.User", null, LocaleContextHolder.getLocale())));
//		}
//
//		if (!passwordEncoder.matches(loginRequestDto.getPassword(), User.getPassword())) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(
//					messageSource.getMessage("error.wrong.password", null, LocaleContextHolder.getLocale())));
//		}
//		
//		String accessToken = jwtservice.createAccessToken("UserId", loginRequestDto.getUserId());
//		String refreshToken = jwtservice.createRefreshToken("UserId", loginRequestDto.getUserId());
//		logger.debug("로그인 accessToken 정보 : {}", accessToken);
//		logger.debug("로그인 refreshToken 정보 : {}", refreshToken);
//		resultMap.put("access-token", accessToken);
//		resultMap.put("refresh-token", refreshToken);
//		resultMap.put("message", SUCCESS);
//		status = HttpStatus.ACCEPTED;
//		
//		return new ResponseEntity<>(resultMap, status);
//	}
//
//	@PostMapping("/refresh")
//	public ResponseEntity<?> refreshToken(@RequestBody TokenDto tokenDto) throws Exception {
//		Map<String, Object> resultMap = new HashMap<>();
//		HttpStatus status = HttpStatus.ACCEPTED;
//		logger.debug("token : {}, userDto : {}", tokenDto.getRefreshToken(), tokenDto.getUserId());
//		if (jwtservice.checkToken(tokenDto.getRefreshToken())) {
//			if (tokenDto.getRefreshToken().equals(tokenService.getRefreshToken(tokenDto.getUserId()))) {
//				String accessToken = jwtservice.createAccessToken("UserId", tokenDto.getUserId());
//				logger.debug("token : {}", accessToken);
//				logger.debug("정상적으로 액세스토큰 재발급");
//				resultMap.put("access-token", accessToken);
//				resultMap.put("message", SUCCESS);
//				status = HttpStatus.ACCEPTED;
//			}
//		} else {
//			logger.debug("리프레쉬 토큰 사용불가");
//			status = HttpStatus.UNAUTHORIZED;
//		}
//		return new ResponseEntity<Map<String, Object>>(resultMap, status);
//	}

//	@GetMapping("/refresh")
//	public ResponseEntity<Map<String, String>> refresh(HttpServletRequest request, HttpServletResponse response) {
//		String authorizationHeader = request.getHeader(AUTHORIZATION);
//
//		if (authorizationHeader == null || !authorizationHeader.startsWith(TOKEN_HEADER_PREFIX)) {
//			throw new RuntimeException("JWT Token이 존재하지 않습니다.");
//		}
//		String refreshToken = authorizationHeader.substring(TOKEN_HEADER_PREFIX.length());
//		Map<String, String> tokens = loginservice.refresh(refreshToken);
//		response.setHeader(AT_HEADER, tokens.get(AT_HEADER));
//		if (tokens.get(RT_HEADER) != null) {
//			response.setHeader(RT_HEADER, tokens.get(RT_HEADER));
//		}
//		return ResponseEntity.ok(tokens);
//	}
}
