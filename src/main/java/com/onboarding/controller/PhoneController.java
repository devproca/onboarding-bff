package ca.devpro.controller;

import ca.devpro.api.PhoneDto;
import ca.devpro.service.PhoneService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/users/{userId}/phonenumbers")
public class PhoneController {

    @Autowired
    private PhoneService phoneService;

    @GetMapping
    public List<PhoneDto> findAll(@PathVariable("userId") UUID userId) {
        return phoneService.findAll(userId);
    }

    @GetMapping("/{phoneId}")
    public PhoneDto get(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId) {
        return phoneService.get(userId, phoneId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PhoneDto create(@PathVariable("userId") UUID userId, @RequestBody PhoneDto dto) {
        dto.setUserId(userId);
        return phoneService.create(dto);
    }

    @PutMapping("/{phoneId}")
    public PhoneDto update(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId, @RequestBody PhoneDto dto) {
        dto.setUserId(userId);
        dto.setPhoneId(phoneId);
        return phoneService.update(dto);
    }

    @DeleteMapping("/{phoneId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId) {
        phoneService.delete(userId, phoneId);
    }
}
