package com.onboarding.api;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.UUID;

@Data
@Accessors(chain = true)
public class SmsDto {
    private UUID verifyId;
    private String phoneNumber;
    private String verifyCode;
}
