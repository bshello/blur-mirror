package com.blur.userservice.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blur.userservice.api.entity.EmailAuth;

public interface EmailRepository extends JpaRepository<EmailAuth, Long> {

    public EmailAuth findByTempNo(String tempNo);
}
