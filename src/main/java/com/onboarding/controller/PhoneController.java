package com.onboarding.controller;

import com.onboarding.api.PhoneDto;
import com.onboarding.client.PhoneClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/users/{userId}/phonenumbers")
public class PhoneController {

    @Autowired
    private PhoneClient phoneClient;

    @GetMapping
    public List<PhoneDto> findAll(@PathVariable("userId") UUID userId) {
        return phoneClient.findAll(userId);
    }

    @GetMapping("/{phoneId}")
    public PhoneDto get(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId) {
        return phoneClient.get(userId, phoneId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PhoneDto create(@PathVariable("userId") UUID userId, @RequestBody PhoneDto dto) {
        dto.setUserId(userId);
        return phoneClient.create(userId, dto);
    }

    @PutMapping("/{phoneId}")
    public PhoneDto update(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId, @RequestBody PhoneDto dto) {
        dto.setUserId(userId);
        dto.setPhoneId(phoneId);
        return phoneClient.update(userId, dto);
    }

    @DeleteMapping("/{phoneId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId) {
        phoneClient.delete(userId, phoneId);
    }
}
