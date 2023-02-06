package com.blur.blurprofile.entity;

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
@Table(name = "category")
public class Category {

    @Id
    @Column(name = "category_name", nullable = false, length = 120, unique = true)
    private String categoryName;

    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "category")
    private Collection<Interest> interest;

    public void addInterest(Interest i){
        if(interest  == null ){
            interest = new ArrayList<Interest>();
        }
        interest.add(i);
    }
}
