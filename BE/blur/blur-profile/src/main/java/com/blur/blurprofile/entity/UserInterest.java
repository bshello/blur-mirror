package com.blur.blurprofile.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_interest")
public class UserInterest {

    @Id
    @Column(name = "user_id")
    private String userId;

    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "userInterest")
    private Collection<Interest> interest;

    public void addInterest(Interest i){
        if(interest  == null ){
            interest = new ArrayList<Interest>();
        }
        interest.add(i);
    }
}
