package com.onboarding.controller;

import com.onboarding.api.SmsDto;
import com.onboarding.api.PhoneDto;
import com.onboarding.client.VerificationClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/verify")
public class VerificationController {

    @Autowired
    private VerificationClient verificationClient;

    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public PhoneDto CheckVerify(@RequestBody SmsDto dto) {
        return verificationClient.CheckVerify(dto);
    }
}
