package com.blur.blurprofile.repository;

import com.blur.blurprofile.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, String> {

    public List<Category> findAll();

    public Category findByCategoryName(String categoryName);
}
