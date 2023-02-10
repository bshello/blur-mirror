package com.blur.blurmatch.controller;

import com.blur.blurmatch.dto.MatchSettingDto;
import com.blur.blurmatch.dto.request.RequestMatchDto;
import com.blur.blurmatch.dto.response.ResponseMatchDto;
import com.blur.blurmatch.service.MatchService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/match")
public class MatchingController {

    @Autowired
    MatchService matchService;

    @GetMapping("/{id}/getSetting")
    public ResponseEntity<?> getSetting(@PathVariable("id") String userId) {
        MatchSettingDto matchSettingDto = matchService.getSetting(userId);
        return ResponseEntity.status(HttpStatus.OK).body(matchSettingDto);
    }

    @PostMapping("/{id}/saveSetting")
    public ResponseEntity<?> createSetting(@RequestBody MatchSettingDto matchSettingDto) {
        matchService.createSetting(matchSettingDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @PutMapping("/{id}/updateSetting")
    public ResponseEntity<?> updateSetting(@RequestBody MatchSettingDto matchSettingDto) {
        System.out.println("1111111111111111111111111111111111");
        System.out.println(matchSettingDto.getUserId());
        System.out.println("1111111111111111111111111111111111");
        matchService.updateSetting(matchSettingDto);
        String res = "success";
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/start")
    public ResponseEntity<?> matchStart(@RequestBody RequestMatchDto requestMatchDto) {
        ResponseMatchDto responseMatchDto = matchService.matchStart(requestMatchDto);
        if (responseMatchDto == null) {return ResponseEntity.status(HttpStatus.OK).body("match failed");}
        return ResponseEntity.status(HttpStatus.OK).body(requestMatchDto);
    }

    @GetMapping("/check")
    public ResponseEntity<?> matchCheck(@RequestBody RequestMatchDto requestMatchDto) {

        ResponseMatchDto responseMatchDto = matchService.matchStart(requestMatchDto);
        if (responseMatchDto == null) {return ResponseEntity.status(HttpStatus.OK).body("match failed");}
        return ResponseEntity.status(HttpStatus.CREATED).body(responseMatchDto);
    }

}
