package com.blur.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "email_auth")
public class EmailAuth {

    @JsonIgnore
    @Id
    @Column(name = "temp_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long tempNo;

    @Column(name = "auth_key", length = 255)
    String authKey;

}
