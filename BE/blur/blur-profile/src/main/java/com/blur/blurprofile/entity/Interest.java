package com.blur.blurprofile.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "interest")
public class Interest {

    @Id
    @Column(nullable = false, length = 120, unique = true, name = "interest_name")
    private String interestName;

//    @Column(nullable = false)
//    private JSON interest_relation;

    @OneToMany(mappedBy = "interest")
    private List<UserInterest> userInterests = new ArrayList<>();

}
