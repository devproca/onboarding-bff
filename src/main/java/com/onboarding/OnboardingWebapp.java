package com.onboarding;

import com.onboarding.client.UserClient;
import com.onboarding.client.PhoneClient;
import com.onboarding.client.VerificationClient;
import com.onboarding.client.InitializeVerificationClient;
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
	public PhoneClient phoneClient() {
		return new PhoneClient();
	}

	@Bean
	@ConfigurationProperties(prefix = "app.verification-client")
	public VerificationClient verificationClient() {return new VerificationClient(); }

	@Bean
	@ConfigurationProperties(prefix = "app.initialize-verification-client")
	public InitializeVerificationClient initializeVerificationClient() {return new InitializeVerificationClient(); }
}
