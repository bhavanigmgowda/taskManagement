package com.taskmanagement.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagement.dto.Response;
import com.taskmanagement.dto.UserBean;
import com.taskmanagement.service.UserService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class UserController {

	@Autowired
	private UserService service;

	@PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response login(@RequestParam("email") String email, @RequestParam("password") String password,
			HttpServletRequest req) {
		
		
		return service.login(email, password, req);
	}// End of login()

	@PostMapping(value = "/create-user", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response createUser(@RequestBody UserBean user) {
		return service.createUser(user);
	}// End of createUser()

	@PutMapping(value = "/update-user", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response updateUser(@RequestBody UserBean user) {
		return service.updateUser(user);
	}// End of updateUser()

	@PatchMapping(value = "/update-password", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response updatePassword(@RequestParam(value = "password") String password, @RequestParam("email") String email,
			HttpServletRequest req) {
		return service.updatePassword(email, password, req);
	}// End of updatePassword()

	@GetMapping("/check-email")
	public Response checkEmail(@RequestParam("email")String email) {
		return service.checkEmail(email);
	}//End of checkEmail()


	@GetMapping("/user-profile")
	public Response getUserProfile(@RequestParam("email")String email) {
		return service.getUserProfile(email);
	}//End of userProfile()
	

	
	@GetMapping("/logout")
	public Response logout(HttpSession session) {
		return service.logout(session);
	}// End of logout()
	
	
	
}// End of class
