package com.tyss.emailservice.service;


import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import com.sendgrid.*;

@Service
public class SendGridService {


	public String sendMail(String fromMail, String toMail, String body, String subjectOfMail,List<Email> toos,List<Email> ccs,List<Email> bccs) {
		System.out.println("from mail " + fromMail);
		System.out.println("from mail " + toMail);
		System.out.println("from mail " + body);
		System.out.println("from mail " + subjectOfMail);
		String subject = body;
		Email from = new Email(fromMail);
		Email to = new Email(toMail);
		Content content = new Content("text/plain", subjectOfMail);
		Mail mail = new Mail(from, subject, to, content);
		for(int i=0;i<ccs.size();i++) {
			mail.personalization.get(0).addCc(toos.get(i));
		}
		for(int i=0;i<bccs.size();i++) {
			mail.personalization.get(0).addBcc(toos.get(i));
		}
		
		Email cc1=new Email("nagaraj.m@testyantra.com");
		Email cc2=new Email("muhibprime@gmail.com");
		mail.personalization.get(0).addCc(cc1);
		mail.personalization.get(0).addCc(cc2);
		SendGrid sg = new SendGrid("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");
		Request request = new Request();
		try {
			request.setMethod(Method.POST);
			request.setEndpoint("mail/send");
			request.setBody(mail.build());
			Response response = sg.api(request);
			System.out.println(response.getStatusCode());
			System.out.println(response.getBody());
			System.out.println(response.getHeaders());
		} catch (IOException ex) {
			System.out.println("exception      " + ex);
			return "exception" + ex;
		}
		return "success";
	}
}
