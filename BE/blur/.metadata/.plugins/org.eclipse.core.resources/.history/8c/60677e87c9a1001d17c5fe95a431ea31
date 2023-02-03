package com.blur.business.repository;

import com.blur.business.entity.EmailAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<EmailAuth, Long> {

    public EmailAuth findByTempNo(String tempNo);
}
