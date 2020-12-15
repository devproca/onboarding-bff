package com.onboarding.client;

import lombok.Setter;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.GenericType;
import java.util.List;
import java.util.UUID;

public class PhoneNumberClient {

    private Client client;

    @Setter
    private String baseUri;

    public PhoneNumberClient() {
        client = ClientBuilder.newClient();
    }

    public List<PhoneNumberDto> findAll(UUID userId) {
        return phoneTarget(userId)
                .request()
                .get(new GenericType<>(){});
    }

    public PhoneNumberDto get(UUID userId, UUID phoneId) {
        return phoneTarget(userId, phoneId)
                .request()
                .get(PhoneNumberDto.class);
    }

    public PhoneNumberDto create(PhoneNumberDto dto) {
        return phoneTarget(dto.getUserId())
                .request()
                .post(Entity.json(dto), PhoneNumberDto.class);
    }

    public PhoneNumberDto update(PhoneNumberDto dto) {
        return phoneTarget(dto.getUserId(), dto.getPhoneId())
                .request()
                .put(Entity.json(dto), PhoneNumberDto.class);
    }

    public void delete(UUID userId, UUID phoneId) {
        phoneTarget(userId, phoneId)
                .request()
                .delete(Void.class);
    }

    public void verify(UUID userId, UUID phoneId, VerificationCodeDto dto) {
        verificationCodeTarget(userId, phoneId)
                .request()
                .post(Entity.json(dto), VerificationCodeDto.class);
    }

    private WebTarget phoneTarget() {
        return client.target(baseUri)
                .path("api")
                .path("v1")
                .path("users");
    }

    private WebTarget phoneTarget(UUID userId) {
        return phoneTarget()
                .path(userId.toString())
                .path("phone_numbers");
    }

    private WebTarget phoneTarget(UUID userId, UUID phoneId) {
        return phoneTarget()
                .path(userId.toString())
                .path("phone_numbers")
                .path(phoneId.toString());
    }

    private WebTarget verificationCodeTarget(UUID userId, UUID phoneId) {
        return client.target(baseUri)
                .path("api")
                .path("v1")
                .path("users")
                .path(userId.toString())
                .path("phone_numbers")
                .path(phoneId.toString())
                .path("verify");
    }
}
