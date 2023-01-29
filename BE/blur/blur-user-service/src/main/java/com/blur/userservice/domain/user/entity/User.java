package com.blur.userservice.domain.user.entity;

import com.blur.userservice.global.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "DTYPE")
@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class User extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    private String email;

    private String password;

    private Boolean gender;

    @Column(insertable = false,updatable = false)
    protected String dtype;
    
    @Enumerated(EnumType.STRING)
    private AuthType oauthType;

	public User(Long id, String email, String password, Boolean gender, AuthType oauthType) {
		this.dtype = User.class.getSimpleName();
		this.oauthType = oauthType;
	}

	

//    public User(String email, String password, String name, String phoneNumber) {
//        this.email = email;
//        this.password = new BCryptPasswordEncoder().encode(password);
//        this.name = name;
//        this.phoneNumber = phoneNumber;
//    }
    
    
}
