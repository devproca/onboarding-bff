package com.onboarding.controller;


import com.onboarding.client.UserClient;
import com.onboarding.client.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserClient userClient;

    @GetMapping
    public List<UserDto> findAll() {
        return userClient.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto create(@RequestBody UserDto dto) {
        return userClient.create(dto);
    }
}
