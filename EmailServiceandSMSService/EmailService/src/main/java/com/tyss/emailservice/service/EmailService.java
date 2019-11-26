package com.tyss.emailservice.service;


import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
public class EmailService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	public EmailService(JavaMailSender javaMailSender) {
		this.javaMailSender=javaMailSender;
	}
	
	public void sendEmail(String to, String subject, String body) throws Exception {
		  MimeMessage message = javaMailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message,true);
	        helper.setTo(to);
	        helper.setText(body);
	        helper.setSubject(subject);
	        javaMailSender.send(message);
	}
}
