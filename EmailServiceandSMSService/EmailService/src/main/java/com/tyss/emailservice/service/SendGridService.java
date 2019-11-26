package com.tyss.emailservice.service;

import static org.mockito.Mockito.RETURNS_DEEP_STUBS;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sendgrid.*;

@Service
@ResponseBody
public class SendGridService {

	public String sendMail(String fromMail, String toMail, String body, String subjectOfMail) {
		System.out.println("from mail" + fromMail);
		System.out.println("from mail" + toMail);
		System.out.println("from mail" + body);
		System.out.println("from mail" + subjectOfMail);
		String subject = body;
		Email from = new Email(fromMail);

		Email to = new Email(toMail);
		Content content = new Content("text/plain", subjectOfMail);
		Mail mail = new Mail(from, subject, to, content);
		
		System.out.println("data");
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
			System.out.println("exception" + ex);
			return "exception" + ex;
		}
		return "success";
	}
}
