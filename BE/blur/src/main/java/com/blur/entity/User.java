package com.blur.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User {

    @Id
    @Column(name = "user_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userNo;

    @Column(name = "user_id", nullable = false, length = 255, unique = true)
    private String userId;

    @Column(name = "email", length = 30)
    private String email;

    @JsonIgnore
    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "gender")
    private Boolean gender;

    @OneToOne(mappedBy = "user")
    private UserProfile userProfile;

    public void update(Boolean gender) {
        this.gender = gender;
    }
}
