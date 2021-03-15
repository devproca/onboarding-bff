package ca.devpro.client;

import ca.devpro.api.SmsDto;

import lombok.Setter;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;

public class InitializeVerificationClient {

    private Client client;

    @Setter
    private String baseUri;

    public InitializeVerificationClient() {
        client = ClientBuilder.newClient();
    }

    public SmsDto StartVerify(SmsDto dto) {
        return verifyTarget()
                .request()
                .post(Entity.json(dto), SmsDto.class);
    }

    private WebTarget verifyTarget() {
        return baseTarget()
                .path("api")
                .path("v1")
                .path("start-verify");
    }

    private WebTarget baseTarget() {
        return client.target(baseUri);
    }
}
