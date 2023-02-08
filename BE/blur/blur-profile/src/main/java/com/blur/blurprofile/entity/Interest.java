package com.blur.blurprofile.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "interest")
public class Interest {

    @Id
    @Column(nullable = false, length = 120, unique = true)
    private String interestName;

//    @Column(nullable = false)
//    private JSON interest_relation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_name")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserInterest userInterest;

}
