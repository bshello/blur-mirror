package com.blur.business.entity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User {

    @JsonIgnore
    @Id
    @Column(name = "user_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userNo;

    @Column(name = "user_id", nullable = false, length = 255, unique = true)
    private String userId;

    @Column(name = "email", length = 30)
    private String email;

    @JsonIgnore
    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "gender")
    private String gender;
    
    @Column(name = "roles", length = 255)
    private String roles;
    
    @OneToOne(mappedBy = "user")
    private UserProfile userProfile;

    @OneToOne(mappedBy = "user")
    private MatchingSetting matchingSetting;

    @OneToOne(mappedBy = "user")
    private MatchMakingRating matchMakingRating;

    public void updateGender(String gender) {
        this.gender = gender;
    }

    public void updatePassword(String password) {
        this.password = password;
    }
    
    public List<String> getRoleList() {
        if (roles.length() > 0) {
            return Arrays.asList(roles.split(","));
        }
        return new ArrayList<>();
    }
    
    @Builder
    public User(String userId, String password) {
        this.userId = userId;
        this.password = password;
        this.roles = "ROLE_USER";
    }
    
    public static User testCreate(String userId, String password) {
        return User.builder()
                .userId(userId)
                .password(password)
                .build();
    }
}
