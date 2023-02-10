package com.blur.blurmatch.service;

import com.blur.blurmatch.dto.MatchDto;
import com.blur.blurmatch.dto.MatchSettingDto;
import com.blur.blurmatch.dto.QueueDto;
import com.blur.blurmatch.dto.request.RequestMatchDto;
import com.blur.blurmatch.dto.response.ResponseMatchDto;
import com.blur.blurmatch.dto.response.ResponseProfileDto;
import com.blur.blurmatch.entity.MatchMakingRating;
import com.blur.blurmatch.entity.MatchSetting;
import com.blur.blurmatch.repository.MatchMakingRatingRepository;
import com.blur.blurmatch.repository.MatchSettingRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class MatchService {

    @Autowired
    private MatchSettingRepository matchSettingRepository;

    @Autowired
    private MatchMakingRatingRepository matchMakingRatingRepository;

    @Autowired
    private Environment env;

    @Autowired
    private RestTemplate restTemplate;

    private static Map<String, MatchDto> males = new ConcurrentHashMap<>();

    public MatchSettingDto getSetting(String userId) {
        MatchSetting matchSetting = matchSettingRepository.findByUserId(userId);
        System.out.println(matchSetting == null);
        if (matchSetting == null) {
            matchSetting = MatchSetting.builder()
                    .userId(userId)
                    .build();
            matchSettingRepository.save(matchSetting);
        };
        MatchSettingDto matchSettingDto = new ModelMapper().map(matchSetting, MatchSettingDto.class);
        return matchSettingDto;
    }

    public void createSetting(MatchSettingDto matchSettingDto) {
        MatchSetting matchSetting = new ModelMapper().map(matchSettingDto, MatchSetting.class);
        matchSettingRepository.save(matchSetting);
    }

    public void updateSetting(MatchSettingDto matchSettingDto) {
        String userId = matchSettingDto.getUserId();
        MatchSetting matchSetting = matchSettingRepository.findByUserId(userId);
        matchSetting.update(matchSettingDto);
        matchSettingRepository.save(matchSetting);
    }

    public ResponseMatchDto matchStart(RequestMatchDto requestMatchDto) {
        System.out.println(males);
        String userId = requestMatchDto.getUserId();
        String getProfileUrl = String.format(env.getProperty("blur-profile.url")) + "/" + userId + "/service";
        ResponseEntity<ResponseProfileDto> profileResponse = restTemplate.exchange
                (getProfileUrl, HttpMethod.GET, null, new ParameterizedTypeReference<ResponseProfileDto>() {});
        ResponseProfileDto responseProfileDto = profileResponse.getBody();
        MatchSetting matchSetting = matchSettingRepository.findByUserId(userId);
        MatchMakingRating matchMakingRating = matchMakingRatingRepository.findByUserId(userId);
        if (matchMakingRating == null) {
            matchMakingRating = MatchMakingRating.builder()
                    .userId(userId)
                    .point(1000)
                    .build();
            matchMakingRatingRepository.save(matchMakingRating);
        }
        MatchDto matchDto = new MatchDto(requestMatchDto, matchSetting, matchMakingRating, responseProfileDto);
        ResponseMatchDto responseMatchDto = null;

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
