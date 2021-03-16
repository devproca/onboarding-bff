package com.onboarding.client;

import com.onboarding.api.PhoneDto;
import lombok.NonNull;
import lombok.Setter;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.GenericType;
import java.util.List;
import java.util.UUID;

public class PhoneClient {

    @Setter
    private String baseUri;

    private Client client;

    public PhoneClient() {
        client = ClientBuilder.newClient();
    }

    public PhoneDto create(UUID userId, PhoneDto dto) {
        return phoneTarget(userId)
                .request()
                .post(Entity.json(dto), PhoneDto.class);
    }

    public PhoneDto update(UUID userId, PhoneDto dto) {
        return phoneTarget(userId, dto.getPhoneId())
                .request()
                .put(Entity.json(dto), PhoneDto.class);
    }

    public void delete(UUID userId, UUID phoneId) {
        phoneTarget(userId, phoneId)
                .request()
                .delete(Void.class);
    }

    public PhoneDto get(UUID userId, UUID phoneId) {
        return phoneTarget(userId, phoneId)
                .request()
                .get(PhoneDto.class);
    }

    public List<PhoneDto> findAll(UUID userId) {
        return phoneTarget(userId)
                .request()
                .get(new GenericType<>() {
                });
    }

    private WebTarget phoneTarget(@NonNull UUID userId) {
        return baseTarget()
                .path("api")
                .path("v1")
                .path("users")
                .path(userId.toString())
                .path("phonenumbers");
    }

    private WebTarget phoneTarget(@NonNull UUID userId, @NonNull UUID phoneId) {
        return phoneTarget(userId)
                .path(phoneId.toString());
    }

    private WebTarget baseTarget() {
        return client.target(baseUri);
    }
}
