package com.onboarding.api;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class VerificationDto {
    private String verifyCode;
}
