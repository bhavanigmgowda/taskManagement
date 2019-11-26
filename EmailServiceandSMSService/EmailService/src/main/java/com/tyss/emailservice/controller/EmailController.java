package com.tyss.emailservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tyss.emailservice.dto.EmailDto;
import com.tyss.emailservice.service.EmailService;
import com.tyss.emailservice.service.SendGridService;

@Controller


public class EmailController {
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private SendGridService sendGrid;
	
	@GetMapping("/sendEmail")
	public String sendeEmail(@RequestBody String to, 
			@RequestBody String subject, @RequestBody String body) {
		try {
			emailService.sendEmail(to, subject, body);
            return "mail send";
        }catch(Exception ex) {
            return "Error in sending email: "+ex;
        }
	}
	
	@ResponseBody
	@PostMapping("/sendgridEmail")
	public void sendGridEmail(@RequestBody EmailDto emailDto) {
		sendGrid.sendMail(emailDto.getFrom(),emailDto.getTo(),emailDto.getBody(),emailDto.getSubject());
	}
}
