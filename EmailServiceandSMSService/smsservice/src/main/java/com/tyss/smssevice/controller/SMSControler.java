package com.tyss.smssevice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tyss.smssevice.service.SMSService;


@RestController
@ResponseBody
public class SMSControler {
	
	@Autowired
	SMSService smsService;
	
	@PostMapping(value = "/sendsms", produces = MediaType.APPLICATION_JSON_VALUE)
	public String createProject( @RequestParam String message , @RequestParam String sender ,  @RequestParam String number) {
		return smsService.sendSms(message, sender, number);
	}
}
