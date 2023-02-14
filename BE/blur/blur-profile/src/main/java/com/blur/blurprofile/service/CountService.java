package com.blur.blurprofile.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.blur.blurprofile.dto.UserInterestCountDto;
import com.blur.blurprofile.entity.Interest;
import com.blur.blurprofile.repository.InterestRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CountService {
	private final InterestRepository interestRepository;

//    public void printInterestRanking() {
//        List<Object[]> resultList = interestRepository.countUserInterestsByInterest();
//        for (Object[] result : resultList) {
//            Interest interest = (Interest) result[0];
//            Long userInterestCount = (Long) result[1];
//            System.out.println(interest.getInterestName() + ": " + userInterestCount);
//        }
//    }
	
	public List<UserInterestCountDto> getTopUserInterestsByInterest(String interestName) {
        List<Object[]> resultList = interestRepository.countTopUserInterestsByInterest(interestName);
        List<UserInterestCountDto> topUserInterests = new ArrayList<>();

        for (Object[] result : resultList) {
            Interest interest = (Interest) result[0];
            Long userInterestCount = (Long) result[1];
            topUserInterests.add(new UserInterestCountDto(userInterestCount, interest.getInterestName()));
        }

        return topUserInterests;
    }
}
