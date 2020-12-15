package com.onboarding.controller;


import com.onboarding.client.PhoneNumberClient;
import com.onboarding.client.PhoneNumberDto;
import com.onboarding.client.VerificationCodeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
public class PhoneNumberController {

    @Autowired
    private PhoneNumberClient phoneNumberClient;

    @GetMapping("/{userId}/phone_numbers")
    public List<PhoneNumberDto> findAll(@PathVariable("userId") UUID userId) {
        return phoneNumberClient.findAll(userId);
    }

    @GetMapping("/{userId}/phone_numbers/{phoneId}")
    public PhoneNumberDto get(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId) {
        return phoneNumberClient.get(userId, phoneId);
    }

    @PostMapping("/{userId}/phone_numbers")
    @ResponseStatus(HttpStatus.CREATED)
    public PhoneNumberDto create(@PathVariable("userId") UUID userId, @RequestBody PhoneNumberDto dto) {
        dto.setUserId(userId);
        return phoneNumberClient.create(dto);
    }

    @PutMapping("/{userId}/phone_numbers/{phoneId}")
    public PhoneNumberDto update(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId, @RequestBody PhoneNumberDto dto) {
        dto.setPhoneId(phoneId);
        dto.setUserId(userId);
        System.out.println(dto);
        return phoneNumberClient.update(dto);
    }

    @DeleteMapping("/{userId}/phone_numbers/{phoneId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId) {
        phoneNumberClient.delete(userId, phoneId);
    }

    @PostMapping("/{userId}/phone_numbers/{phoneId}/verify")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void verify(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId, @RequestBody VerificationCodeDto dto) {
        dto.setPhoneId(phoneId);
        phoneNumberClient.verify(userId, phoneId, dto);
    }


}


