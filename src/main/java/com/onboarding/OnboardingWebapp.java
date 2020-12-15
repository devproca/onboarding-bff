package com.onboarding;

import com.onboarding.client.PhoneNumberClient;
import com.onboarding.client.UserClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class OnboardingWebapp {

	public static void main(String[] args) {
		SpringApplication.run(OnboardingWebapp.class, args);
	}

	@Bean
	@ConfigurationProperties(prefix = "app.user-client")
	public UserClient userClient() {
		return new UserClient();
	}

	@Bean
	@ConfigurationProperties(prefix = "app.phone-client")
	public PhoneNumberClient phoneNumberClient() {
		return new PhoneNumberClient();
	}

}
