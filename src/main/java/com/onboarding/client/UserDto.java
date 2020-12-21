package com.onboarding.client;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.UUID;

@Data
@Accessors(chain = true)
public class UserDto {
    private UUID userId;
    private String firstName;
    private String lastName;
    private String username;
}
