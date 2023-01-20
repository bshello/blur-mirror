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

    @JsonIgnore
    @Id
    @Column(name = "user_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long userNo;

    @Column(name = "user_id", nullable = false, length = 255, unique = true)
    String userId;

    @Column(name = "email", length = 30)
    String email;

    @JsonIgnore
    @Column(name = "password", length = 255)
    String password;

    @Column(name = "gender")
    Boolean gender;

}
