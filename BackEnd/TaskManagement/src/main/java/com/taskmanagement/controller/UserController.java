package com.taskmanagement.controller;

/**
 * @role class for creating, updating User in task management application
 */

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

	/**
	 * @role service is autowired for creating object for user service and inject
	 *       the bean
	 */
	@Autowired
	private UserService service;

	/**
	 * @role handler for login authentication
	 * @param email:    takes email value from request
	 * @param password: takes password value from request
	 * @return
	 */
	@PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response login(@RequestParam("email") String email, @RequestParam("password") String password) {
		return service.login(email, password);
	}// End of login()

	/**
	 * @role handler for creating new user
	 * @param user: takes bean object from request
	 * @return response object from service.createUser(user)
	 */
	@PostMapping(value = "/create-user", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response createUser(@RequestBody UserBean user) {
		return service.createUser(user);
	}// End of createUser()

	/**
	 * @role handler for updating user details
	 * @param id:   takes user id from request
	 * @param user: takes user object from request
	 * @return response object from service.updateUser(id,user)
	 */
	@PutMapping(value = "/update-user", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response updateUser(@RequestParam("id") int id, @RequestBody UserBean user) {
		return service.updateUser(id, user);
	}// End of updateUser()

	/**
	 * @role handler for updating password
	 * @param password: takes new password value from request
	 * @param email:    takes email value from request
	 * @return response object from service..updatePassword(email,password)
	 */
	@PatchMapping(value = "/update-password", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response updatePassword(@RequestParam(value = "password") String password,
			@RequestParam("email") String email) {
		return service.updatePassword(email, password);
	}// End of updatePassword()

	/**
	 * @role handler to check whether exists or not
	 * @param email: takes email value from request
	 * @return response object from service.checkEmail(email)
	 */
	@GetMapping(value = "/check-email", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response checkEmail(@RequestParam("email") String email) {
		return service.checkEmail(email);
	}// End of checkEmail()

	/**
	 * @role handler to retrieve user profile detail
	 * @param email: takes email value from request
	 * @return response object from service.getProfile(email)
	 */
	@GetMapping(value = "/get-profile", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getProfile(@RequestParam("email") String email) {
		return service.getProfile(email);
	}// End of get-profile()

	/**
	 * @role handler to logout user and invalid session
	 * @param session takes session object
	 * @return response object from service.logout(session)
	 */
	@GetMapping("/logout")
	public Response logout(HttpSession session) {
		return service.logout(session);
	}// End of logout()
	
	@GetMapping(value = "/get-all-User", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getAllMember() {
		return service.getAllMemebers();
	}
	
	@GetMapping("/get-emails-while-search")
	public Response getEmailsWhileSearch(String email) {
		return service.getEmailsWhilesearch(email);
	}
	
	@GetMapping(value = "/get-User", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getMember(String name) {
		return service.getMemeber(name);
	}
	
	  @GetMapping("/get-emails-while-createtask")
		public Response getEmailsWhileCreatingTask(String email,int projectId) {
			return service.getEmailsWhileCreatingTask(email,projectId);
		}

}// End of class
