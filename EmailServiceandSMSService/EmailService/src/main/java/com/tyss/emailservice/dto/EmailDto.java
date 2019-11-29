package com.tyss.emailservice.dto;

import java.util.List;

import com.sendgrid.Email;

import lombok.Data;

@Data
public class EmailDto {
	
	private String from;
	private String to;
	private String subject;
	private String body;
	
	private List<Email> toos;
	private List<Email> ccs;
	private List<Email> bccs;
	
}
