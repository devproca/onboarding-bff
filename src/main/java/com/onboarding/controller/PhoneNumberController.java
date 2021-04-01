package com.onboarding.controller;

import com.onboarding.api.PhoneNumberDto;

import com.onboarding.api.VerificationDto;
import com.onboarding.client.PhoneNumberClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users/{userId}/phonenumbers")
public class PhoneNumberController {

    @Autowired
    private PhoneNumberClient phoneClient;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PhoneNumberDto create(@PathVariable("userId") UUID userId, @RequestBody PhoneNumberDto dto) {
        dto.setUserId(userId);
        return phoneClient.create(dto);
    }

    @PutMapping("/{phoneId}")
    public PhoneNumberDto update(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId, @RequestBody PhoneNumberDto dto) {
        dto.setUserId(userId);
        dto.setPhoneId(phoneId);
        return phoneClient.update(dto);
    }

    @GetMapping()
    public List<PhoneNumberDto> findAll(@PathVariable("userId") UUID userId) {
        return phoneClient.findAll(userId);
    }

    @GetMapping("/{phoneId}")
    public PhoneNumberDto get(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId) {
        return phoneClient.get(userId, phoneId);
    }

    @DeleteMapping("/{phoneId}")
    public void delete(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId) {
        phoneClient.delete(userId, phoneId);
    }

    @PostMapping("/{phoneId}/initiateVerification")
    public void sendVerifyCode(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId) {
        // phoneClient.sendVerifyCode(userId, phoneId);
    }

    @PostMapping("/{phoneId}/verify")
    public void verifyCode(@RequestBody VerificationDto verifyDto, @PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId) {
        // phoneClient.verifyCode(verifyDto, userId, phoneId);
    }
}
