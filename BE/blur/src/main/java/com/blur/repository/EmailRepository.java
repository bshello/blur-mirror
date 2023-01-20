package com.blur.repository;

import com.blur.entity.EmailAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<EmailAuth, Long> {

    public EmailAuth findByTempNo(String tempNo);
}
