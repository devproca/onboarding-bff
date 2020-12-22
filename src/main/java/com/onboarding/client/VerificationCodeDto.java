package com.onboarding.client;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.UUID;

@Data
@Accessors(chain = true)
public class VerificationCodeDto {

    private UUID phoneId;
    private String code;

}

