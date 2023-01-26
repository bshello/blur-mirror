package com.blur.repository;

import com.blur.entity.User;
import com.blur.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUserId(String userId);

}
