package com.onboarding;

import com.onboarding.client.PhoneClient;
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
	@ConfigurationProperties("app.user")
	public UserClient userClient() {
		return new UserClient();
	}

	@Bean
	@ConfigurationProperties("app.user")
	public PhoneClient phoneClient() {
		return new PhoneClient();
	}
}
