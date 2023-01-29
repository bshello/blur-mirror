package com.blur.userservice.global;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SqlCommandLineRunner implements CommandLineRunner {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
//    private final StoreOwnerRepository storeOwnerRepository;
//    private final CustomerRepository customerRepository;

    @Override
    public void run(String... args) throws Exception {
        String encode = bCryptPasswordEncoder.encode("1234");

//        StoreOwner owner = new StoreOwner("owner@gmail.com", encode,
//                "점주 테스트 계정", "010-9876-5432", null);
//        storeOwnerRepository.save(owner);
//
//        Customer customer = new Customer("customer@gmail.com", encode,
//                "고객 테스트 계정", "010-1234-5678", AuthType.NAVER);
//        customerRepository.save(customer);
    }
}
