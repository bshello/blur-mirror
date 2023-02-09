package com.blur.blurmatch.controller;

import com.blur.blurmatch.dto.MatchSettingDto;
import com.blur.blurmatch.dto.request.RequestMatchDto;
import com.blur.blurmatch.dto.response.ResponseMatchDto;
import com.blur.blurmatch.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/match")
public class MatchingController {

    @Autowired
    MatchService matchService;

    @PostMapping("/saveSetting")
    public ResponseEntity<?> saveSetting(@RequestBody MatchSettingDto matchSettingDto) {

        matchService.saveSetting(matchSettingDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @PostMapping("/start")
    public ResponseEntity<?> matchStart(@RequestBody RequestMatchDto requestMatchDto) {

        ResponseMatchDto responseMatchDto = matchService.matchStart(requestMatchDto);
        if (responseMatchDto == null) {return ResponseEntity.status(HttpStatus.OK).body("match failed");}

        return ResponseEntity.status(HttpStatus.CREATED).body(responseMatchDto);
    }

    @GetMapping("/check")
    public ResponseEntity<?> matchCheck(@RequestBody RequestMatchDto requestMatchDto) {

        ResponseMatchDto responseMatchDto = matchService.matchStart(requestMatchDto);
        if (responseMatchDto == null) {return ResponseEntity.status(HttpStatus.OK).body("match failed");}

        return ResponseEntity.status(HttpStatus.CREATED).body(responseMatchDto);
    }

}
