package com.tyss.emailservice.service;


	import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
	import org.springframework.context.annotation.PropertySource;

import com.sendgrid.SendGrid;
	 
	 
	@Configuration
	@PropertySource("classpath:application.properties")
	public class SendGridConfig {
	 
	    @Value("${sendgrid.api.key}") 
	   private String sendGridAPIKey;
	    
	    @Bean(value = "prototype")
	    public SendGrid getSendGrid() {
	    	return new SendGrid(sendGridAPIKey);
	    }
	}

