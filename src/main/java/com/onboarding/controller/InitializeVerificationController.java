package com.onboarding.controller;

import com.onboarding.client.InitializeVerificationClient;

import com.onboarding.api.SmsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/start-verify")
public class InitializeVerificationController {

    @Autowired
    private InitializeVerificationClient initializeVerificationClient;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SmsDto StartVerify(@RequestBody SmsDto dto) {
        return initializeVerificationClient.StartVerify(dto);
    }

    ;
}
