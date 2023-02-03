package com.blur.user.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blur.user.api.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByUserId(String userId);

	Optional<User> findTopByOrderByIdDesc();

}
