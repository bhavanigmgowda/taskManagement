package com.tyss.emailservice.dto;

import lombok.Data;

@Data
public class EmailDto {
	
	public String from;
	public String to;
	public String subject;
	public String body;

}
