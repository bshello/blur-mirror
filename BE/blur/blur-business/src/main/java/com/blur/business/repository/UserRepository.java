package com.blur.business.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blur.business.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUserId(String userId);

}
