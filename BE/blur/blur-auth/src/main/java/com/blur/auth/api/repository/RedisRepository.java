package com.blur.auth.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.blur.auth.api.entity.EmailAuth;

@Repository
public interface RedisRepository extends CrudRepository <EmailAuth, String>{

	EmailAuth findByEmail(String email);

}
