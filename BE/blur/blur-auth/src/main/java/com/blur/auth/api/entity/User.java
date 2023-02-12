package com.blur.auth.api.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.blur.auth.oauth.entity.ProviderType;
import com.blur.auth.oauth.entity.RoleType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "user")
public class User {
    @JsonIgnore
    @Id
    @Column(name = "user_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userNo;

    @Column(name = "user_id", unique = true)
    @NotNull
    @Size(max = 64)
    private String userId;

    @JsonIgnore
    @Column(name = "password")
    @NotNull
    private String password;

    @Column(name = "email")
    @NotNull
    @Size(max = 512)
    private String email;

    @Column(name = "provider_type")
    @Enumerated(EnumType.STRING)
    @NotNull
    private ProviderType providerType;

    @Column(name = "role_type")
    @Enumerated(EnumType.STRING)
    @NotNull
    private RoleType roleType;
    
//    private String gender;

    public User(
            @NotNull @Size(max = 64) String userId,
            @NotNull @Size(max = 512) String email,
            @NotNull ProviderType providerType,
            @NotNull RoleType roleType
    ) {
        this.userId = userId;
        this.password = "NO_PASS";
        this.email = email != null ? email : "NO_EMAIL";
        this.providerType = providerType;
        this.roleType = roleType;
    }
    
//    public void updateGender(String gender) {
//        this.gender = gender;
//    }

    public void updatePassword(String password) {
        this.password = password;
    }

}
