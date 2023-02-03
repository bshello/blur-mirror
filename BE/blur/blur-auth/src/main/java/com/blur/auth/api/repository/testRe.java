package com.blur.auth.api.repository;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class testRe {
	private static void findTest(EntityManager em, Long userNo) {
		String q = "select m from user right";
	}
}
