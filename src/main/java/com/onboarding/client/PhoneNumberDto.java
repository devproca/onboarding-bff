package com.onboarding.client;


import lombok.Data;
import lombok.experimental.Accessors;

import java.util.UUID;

@Data
@Accessors(chain = true)
public class PhoneNumberDto {

    private UUID phoneId;
    private UUID userId;
    private String phoneNumber;
    private boolean isVerified;

}
