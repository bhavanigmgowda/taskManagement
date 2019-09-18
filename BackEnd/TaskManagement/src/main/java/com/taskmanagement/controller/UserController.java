package com.taskmanagement.controller;

import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ser.std.StdKeySerializers.Default;
import com.taskmanagement.dto.UserBean;
import com.taskmanagement.repo.UserRepository;
import com.taskmanagement.response.Response;

@RestController
@EntityScan(basePackages = "com.taskmanagement")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	UserRepository repository;

	@GetMapping(path = "/checkEmail", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public Response checkEmail(@RequestParam("email") String email, HttpServletRequest req) {

		Response response = new Response();

		if (repository.existsByEmail(email)) {
			response.setStatusCode(201);
			response.setMessage("Success");
			response.setDescription("Email is found in Database");
		} else {
			response.setStatusCode(401);
			response.setMessage("Failure");
			response.setDescription("Email is not found");

		}
		return response;
	}// End of checkEmail()

	@GetMapping(path = "/setPassword", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public Response setPassword(@RequestParam("password") String password, @RequestParam("email") String email,
			HttpServletRequest req) {

		Response response = new Response();

		if (repository.existsByEmail(email)) {
			UserBean bean = repository.findByEmail(email).get();
			bean.setPassword(password);
			repository.save(bean);
			response.setStatusCode(201);
			response.setMessage("Success");
			response.setDescription("PASSWORD IS CHANGED");
		} else {
			response.setStatusCode(401);
			response.setMessage("Failure");
			response.setDescription("PASSWORD IS NOT CHANGED");

		}
		return response;
	}// End of setPassword()

	// Login Controller For Task Management app
	@PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response login(@RequestParam("email") String email, @RequestParam("password") String password,
			HttpServletRequest req) {
		Response response = new Response();
		if (repository.existsByEmail(email)) {

			UserBean bean = repository.findByEmail(email).get();
			if (bean != null && bean.getPassword().equals(password) && bean.getEmail().equals(email)) {

				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("Login successfully");
				bean.setPassword(null);
				response.setUserBean(Arrays.asList(bean));
				req.getSession().setAttribute("bean", bean);
			} else {
				response.setStatusCode(401);
				response.setMessage("Failed");
				response.setDescription("Login Failed");
			}
	} else {
			response.setStatusCode(401);
			response.setMessage("Failed");
			response.setDescription("No Email Found");
		}
		return response;
	}// End of login()

	@PutMapping(value = "/updateUser", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response updateUser(@RequestBody UserBean user) {
		Response response = new Response();
		if (repository.existsByEmail(user.getEmail())) {

			repository.save(user);
			response.setStatusCode(201);
			response.setMessage("Success");
			response.setDescription("User updated successfully");
		} else {
			response.setStatusCode(401);
			response.setMessage("Failure");
			response.setDescription("data not found for registered email ");
		}
		return response;

	}// End of updateUser()

	@PostMapping(value = "/createUser", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response createUser(@RequestBody UserBean user) {
		Response response = new Response();
		if (!repository.existsByEmail(user.getEmail())) {
			repository.save(user);
			response.setStatusCode(201);
			response.setMessage("Success");
			response.setDescription("User added successfully");
		} else {
			response.setStatusCode(401);
			response.setMessage("Failure");
			response.setDescription("user id already exist ");
		}
		return response;

	}// End of createUser()

	@GetMapping("/logout")
	public Response logout(HttpSession session) {
		Response response = new Response();
		session.invalidate();
		response.setStatusCode(201);
		response.setMessage("Success");
		response.setDescription("Logout successfully");
		return response;
	}// End of logout()

	@GetMapping("/readCookie")
	public Response readCookie(@CookieValue(name = "JSESSIONID") String sessionId) {
		Response response = new Response();
		response.setStatusCode(201);
		response.setMessage("Success");
		response.setDescription("JSESSIONID:" + sessionId);
		return response;
	}// end of readcookie()

}// End of class
