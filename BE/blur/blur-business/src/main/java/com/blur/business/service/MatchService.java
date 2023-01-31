package com.blur.business.service;

import com.blur.business.api.dto.MatchDto;
import com.blur.business.entity.MatchMakingRating;
import com.blur.business.entity.MatchingSetting;
import com.blur.business.entity.User;
import com.blur.business.entity.UserProfile;
import com.blur.business.repository.MatchMakingRatingRepository;
import com.blur.business.repository.MatchingSettingRepository;
import com.blur.business.repository.UserProfileRepository;
import com.blur.business.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class MatchService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final UserProfileRepository userProfileRepository;

    @Autowired
    private final MatchingSettingRepository matchingSettingRepository;

    @Autowired
    private final MatchMakingRatingRepository matchMakingRatingRepository;

    private static Map<Integer, MatchDto> males = new ConcurrentHashMap<>();

    public void saveSetting(MatchDto.MatchSettingDto matchSettingDto) {
        MatchingSetting matchingSetting = matchSettingDto.toEntity();
        matchingSettingRepository.save(matchingSetting);
    }

    public void matchStart(MatchDto.MatchInfoDto matchInfoDto) {

        String userId =  matchInfoDto.getUserId();
        User user = userRepository.findByUserId(userId);
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        MatchingSetting matchingSetting = matchingSettingRepository.findByUserId(userId);
        MatchMakingRating matchMakingRating = matchMakingRatingRepository.findByUserId(userId);

        MatchDto matchDto = new MatchDto(user, userProfile, matchInfoDto, matchingSetting, matchMakingRating);

        if (matchDto.getGender() == "male") {
            males.put(matchDto.getUserNo(), matchDto);
            try {
                TimeUnit.SECONDS.sleep(300);
                if (males.get(user.getUserNo()) == null) {return;}
                males.remove(user.getUserNo());
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            return;
        }

        Queue<int[]> maleList = new PriorityQueue<>((o1, o2) -> {
            if(o1[0] == o2[0]) {
                return Integer.compare(o2[1], o1[1]);
            }
            return Integer.compare(o2[0], o1[0]);
        });
        MatchDto femaleDto = matchDto;

        for (int male : males.keySet()) {
            MatchDto maleDto = males.get(male);
            if (!filter(maleDto, femaleDto)) {continue;}
            maleList.offer(new int[] {maleDto.getPoint(), maleDto.getUserNo()});
        }
        while (maleList != null) {
            Integer maleNo = maleList.poll()[1];
            MatchDto selectedMale = males.get(maleNo);
            if (selectedMale != null) {
                males.remove(maleNo);
                System.out.println(selectedMale.getUserId() + femaleDto.getUserId());
            }
        }
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
