package com.taskmanagement.service;

import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.taskmanagement.dto.Response;
import com.taskmanagement.dto.UserBean;
import com.taskmanagement.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repository;

	// Login service For Task Management
	@Override
	public Response login(String email, String password, HttpServletRequest req) {
		Response response = new Response();
		if (repository.existsByEmail(email)) {
			UserBean bean = repository.findByEmail(email).get();
			if (bean != null && bean.getPassword().equals(password)) {

				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("Login successfully");
				req.getSession().setAttribute("bean", bean);
				response.setUserBean(Arrays.asList(bean));

			} else {
				response.setStatusCode(401);
				response.setMessage("Failed");
				response.setDescription("Login Failed");
			}
		} else {
			response.setStatusCode(501);
			response.setMessage("Email not present");
			response.setDescription("email does not exist");
		}
		return response;
	}// End of login()

	// service to add new user
	@Override
	public Response createUser(UserBean user) {
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

	// service to update existing user
	@Override
	public Response updateUser(int employeeId,UserBean user) {
		Response response = new Response();

		if (repository.existsById(user.getEmployeeId())) {

			UserBean bean = repository.findById(user.getEmployeeId()).get();
			if (user.getDesignation() != null && user.getDesignation().trim() != "") {
				bean.setDesignation(user.getDesignation());
			}
			if (user.getEmail() != null && user.getEmail().trim() != "") {
				bean.setEmail(user.getEmail());
			}
			if (user.getEmployeeName() != null && user.getEmployeeName().trim() != "") {
				bean.setEmployeeName(user.getEmployeeName());
			}
			bean.setPassword(bean.getPassword());
			bean.setEmployeeId(bean.getEmployeeId());
			repository.save(bean);
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

	// service to updated password
	@Override
	public Response updatePassword(String email, String password, HttpServletRequest req) {
		Response response = new Response();

		if (repository.existsByEmail(email)) {
			UserBean bean = repository.findByEmail(email).get();
			if (!(password.equals(bean.getPassword()))) {
				if (password != null && password.trim() != "") {
					bean.setPassword(password);
					repository.save(bean);
					response.setStatusCode(201);
					response.setMessage("Success");
					response.setDescription("Password was Changed");
				} else {
					response.setStatusCode(402);
					response.setMessage("Failure");
					response.setDescription("password did not change");
				}

			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Entered Password already exists!!!");
			}
		} else {
			response.setStatusCode(402);
			response.setMessage("Failure");
			response.setDescription("password did not change");
		}
		return response;
	}// End of updatePassword()

	// logout service for session invalidation
	@Override
	public Response logout(HttpSession session) {
		Response response = new Response();
		session.invalidate();
		response.setStatusCode(201);
		response.setMessage("Success");
		response.setDescription("Logout successfully");
		return response;
	}// End of logout()

	
	
	public Response getProfile(@RequestParam("email")String email) {
		Response response=new Response();
		if(repository.existsByEmail(email)) {
			UserBean bean=repository.findByEmail(email).get();
			response.setDescription("profile found successfully" );
			response.setMessage("Success");
			response.setStatusCode(201);
			response.setUserBean(Arrays.asList(bean));
		}else {
			response.setDescription("profile not found ");
			response.setMessage("failure");
			response.setStatusCode(401);
		}
		return response;
		
	}
	
	

	@Override
	public Response checkEmail(String email) {
		Response response = new Response();
		if (repository.existsByEmail(email)) {
			response.setStatusCode(201);
			response.setMessage("Success");
			response.setDescription("Email present in database");
		} else {
			response.setStatusCode(401);
			response.setMessage("Failure");
			response.setDescription("Email is not found");
		}
		return response;
	}

}// End of class
