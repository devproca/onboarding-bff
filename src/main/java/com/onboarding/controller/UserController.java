package com.onboarding.controller;

import com.onboarding.api.UserDto;
import com.onboarding.client.UserClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserClient client;

    @GetMapping("")
    public List<UserDto> find() {
        return client.findAllUsers();
    }

    @GetMapping("/{userId}")
    public UserDto get(@PathVariable UUID userId) {
        return client.getUser(userId);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto create(@RequestBody UserDto dto) {
        return client.createUser(dto);
    }
}

