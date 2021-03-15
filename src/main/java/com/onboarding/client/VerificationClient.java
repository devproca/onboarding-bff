package ca.devpro.client;

import ca.devpro.api.PhoneDto;
import ca.devpro.api.SmsDto;

import lombok.Setter;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;


public class VerificationClient {

    private Client client;

    @Setter
    private String baseUri;

    public VerificationClient() {
        client = ClientBuilder.newClient();
    }

    public PhoneDto CheckVerify(SmsDto dto) {
        return verifyTarget()
                .request()
                .post(Entity.json(dto), PhoneDto.class);
    }

    private WebTarget verifyTarget() {
        return baseTarget()
                .path("api")
                .path("v1")
                .path("verify");
    }

    private WebTarget baseTarget() {
        return client.target(baseUri);
    }
}
