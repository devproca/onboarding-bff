package com.onboarding.client;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.UUID;

@Data
@Accessors(chain = true)
public class PhoneNumberDto {
    private UUID userId;
    private UUID phoneNumberId;
    private String phoneNumber;
    private  String verify;
    private  Boolean verified;
}
