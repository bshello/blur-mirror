package com.blur.blurprofile.repository;

import com.blur.blurprofile.entity.Interest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InterestRepository extends JpaRepository<Interest, String> {

    public List<Interest> findAll();
}
