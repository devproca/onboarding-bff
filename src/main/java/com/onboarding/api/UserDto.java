package com.onboarding.api;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.UUID;

@Data
@Accessors(chain = true)
//@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {

    private UUID userId;
    private String firstName;
    private String lastName;
    private String username;
    private List<PhoneDto> phones;
}


