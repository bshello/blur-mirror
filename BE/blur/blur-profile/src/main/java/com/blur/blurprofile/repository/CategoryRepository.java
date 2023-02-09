package com.blur.blurprofile.repository;

import com.blur.blurprofile.entity.Category;
import com.blur.blurprofile.entity.UserInterest;
import com.blur.blurprofile.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, String> {
    public List<Category> findAll();


}
