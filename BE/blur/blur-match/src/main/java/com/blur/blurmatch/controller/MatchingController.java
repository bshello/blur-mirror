package com.blur.blurmatch.controller;

import com.blur.blurmatch.dto.MatchDto;
import com.blur.blurmatch.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
