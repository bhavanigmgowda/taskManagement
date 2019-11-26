package com.tyss.smssevice.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.stereotype.Service;
@Service
public class SMSService {
	public String sendSms(String textMessage,String senderName, String number ) {
		try {
			// Construct data
			String apiKey = "apikey=" + "wgtTvz8TSxA-zCBscc7Zd8TpRsHgGgwfpxxsVNRsjp	";
			String message = "&message=" + textMessage;
			String sender = "&sender=" + senderName;
			String numbers = "&numbers=" + number;
			
			// Send data
			HttpURLConnection conn = (HttpURLConnection) new URL("https://api.textlocal.in/send/?").openConnection();
			String data = apiKey + numbers + message + sender;
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Length", Integer.toString(data.length()));
			conn.getOutputStream().write(data.getBytes("UTF-8"));
			final BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			final String string = new String();
			String line;
			while ((line = rd.readLine()) != null) {
				string.concat(line);
			}
			rd.close();
			return string.toString();
		} catch (Exception e) {
			System.out.println("Error SMS "+e);
			return "Error "+e;
		}
	}
}
