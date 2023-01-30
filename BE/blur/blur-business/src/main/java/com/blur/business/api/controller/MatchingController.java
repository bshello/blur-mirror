package com.blur.business.api.controller;

import com.blur.business.api.dto.MatchDto;
import com.blur.business.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.concurrent.TimeUnit;

@Controller
@RequestMapping("mathcing/")
public class MatchingController {

    @Autowired
    MatchService matchService;



    @PostMapping("/saveSetting")
    public void saveSetting(@RequestBody MatchDto.MatchSettingDto matchSettingDto) {

        matchService.saveSetting(matchSettingDto);
    }

    @PostMapping("/start")
    public void matchStart(@RequestBody MatchDto.MatchInfoDto matchInfoDto) {

        matchService.matchStart(matchInfoDto);
    }

}
