package ca.devpro.controller;

import ca.devpro.api.PhoneDto;
import ca.devpro.api.SmsDto;
import ca.devpro.service.VerificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/v1/verify")
public class VerificationController {

    @Autowired
    private VerificationService verificationService;

    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public PhoneDto CheckVerify(@RequestBody SmsDto dto) {
        return verificationService.checkVerification(dto);
    }
}
