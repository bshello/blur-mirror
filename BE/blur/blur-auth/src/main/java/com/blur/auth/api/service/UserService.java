package com.blur.auth.api.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.blur.auth.api.dto.UserInfo;
import com.blur.auth.api.entity.User;
import com.blur.auth.api.entity.UserDto;
import com.blur.auth.api.repository.UserRepository;
import com.blur.auth.oauth.entity.ProviderType;
import com.blur.auth.oauth.entity.RoleType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
//    private final ProviderType providerType;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }
        
    private final BCryptPasswordEncoder encoder;

    public User register(UserDto dto) throws Exception{
        User user = dto.toEntity();
        user.setProviderType(ProviderType.LOCAL);
        user.setRoleType(RoleType.USER);
//        user.setProviderType(providerType.LOCAL);
//        userPrincipal.create(user);
        user.updatePassword(encoder.encode(dto.getPassword()));
        userRepository.save(user);
        
//        UserProfileDto userProfileDto = new UserProfileDto();
//        UserProfile userProfile = userProfileDto.toEntity(user);
//        userProfile.setUser(user);
//        userProfileRepository.save(userProfile);
        System.out.println("DB에 회원 저장 성공");
        return user;
    }

    public Boolean checkId(String userId) {

        User userEntity = userRepository.findByUserId(userId);
        if (userEntity!=null) {
            return false;
        }
        System.out.println("회원가입가능");
        return true;
    }

	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		User user = userRepository.findByUserId(userId);
        if (user == null) {
            throw new UsernameNotFoundException("Can not find userId.");
        }
//        return UserPrincipal.create(user);
        return null;
	}
	
	public UserInfo getUserInfo(String userId) {
		User user = userRepository.findByUserId(userId);
		System.out.println(userId);
		UserInfo userInfo = new UserInfo(user.getUserNo(), userId);
		System.out.println(userInfo.toString());
		return userInfo;
	}
	
    public String getEmail(String userId) {
        User user = userRepository.findByUserId(userId);
        String userEmail = user.getEmail();
        return userEmail;
    }
}
