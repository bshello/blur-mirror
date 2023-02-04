package com.blur.auth.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blur.auth.api.entity.EmailAuth;

public interface EmailRepository extends JpaRepository<EmailAuth, Long> {

    public EmailAuth findByTempNo(String tempNo);
}
