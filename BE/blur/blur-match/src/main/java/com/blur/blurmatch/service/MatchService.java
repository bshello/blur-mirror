package com.blur.blurmatch.service;

import com.blur.blurmatch.dto.MatchDto;
import com.blur.blurmatch.dto.MatchSettingDto;
import com.blur.blurmatch.dto.QueueDto;
import com.blur.blurmatch.dto.request.RequestMatchDto;
import com.blur.blurmatch.dto.response.ResponseMatchDto;
import com.blur.blurmatch.entity.MatchMakingRating;
import com.blur.blurmatch.entity.MatchSetting;
import com.blur.blurmatch.repository.MatchMakingRatingRepository;
import com.blur.blurmatch.repository.MatchSettingRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor

public class MatchService {

    @Autowired
    private final MatchSettingRepository matchSettingRepository;

    @Autowired
    private final MatchMakingRatingRepository matchMakingRatingRepository;

    private static Map<String, MatchDto> males = new ConcurrentHashMap<>();

    public void saveSetting(MatchSettingDto matchSettingDto) {
        MatchSetting matchSetting = new ModelMapper().map(matchSettingDto, MatchSetting.class);
        matchSettingRepository.save(matchSetting);
    }

    public ResponseMatchDto matchStart(RequestMatchDto requestMatchDto) {

        String userId = requestMatchDto.getUserId();
        MatchSetting matchSetting = matchSettingRepository.findByUserId(userId);
        MatchMakingRating matchMakingRating = matchMakingRatingRepository.findByUserId(userId);
        ResponseMatchDto responseMatchDto = null;
        MatchDto matchDto = new MatchDto(); //수정 해야함

        if (matchDto.getGender() == "male") {
            males.put(matchDto.getUserId(), matchDto);
            try {
                TimeUnit.SECONDS.sleep(300);
                males.remove(matchDto.getUserId());
                return responseMatchDto;
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

        Queue<QueueDto> maleList = new PriorityQueue<>((o1, o2) -> {
            if(o1.getPoint()  == o2.getPoint()) {
                return o2.getPoint();
            }
            return Integer.compare(o2.getPoint(), o1.getPoint());
        });
        MatchDto femaleDto = matchDto;

        for (String male : males.keySet()) {
            MatchDto maleDto = males.get(male);
            if (!filter(maleDto, femaleDto)) {continue;}
            QueueDto maleQueue = new QueueDto(maleDto);
            maleList.offer(maleQueue);
        }

        while (!maleList.isEmpty()) {
            String maleId = maleList.poll().getUserId();
            MatchDto selectedMale = males.get(maleId);
            if (selectedMale == null) {continue;}
            males.remove(maleId);
            responseMatchDto = new ResponseMatchDto(selectedMale.getUserId(), femaleDto.getUserId());
            return responseMatchDto;
        }
        return responseMatchDto;
    }

    private boolean filter(MatchDto maleDto, MatchDto femaleDto) {
        int maleAge = maleDto.getAge();
        int femaleAge = femaleDto.getAge();
        if (femaleAge < maleDto.getMinAge() || femaleAge > maleDto.getMaxAge() || maleAge < femaleDto.getMinAge() || maleAge > femaleDto.getMaxAge()) {return false;}
        double lat1 = maleDto.getLat();
        double lng1 = maleDto.getLng();
        double lat2 = femaleDto.getLat();
        double lng2 = femaleDto.getLng();
        double distance = distance(lat1, lng1, lat2, lng2);
        if (maleDto.getMaxDistance() < distance || femaleDto.getMaxDistance() < distance) {return false;}
        return true;

    }

    private static double distance(double lat1, double lng1, double lat2, double lng2) {
        double theta = lng1 - lng2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515 * 1.609344;
        return (dist);
    }

    private static double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    private static double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }
}
