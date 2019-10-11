package com.taskmanagement.service;

import javax.servlet.http.HttpSession;

import com.taskmanagement.dto.Response;
import com.taskmanagement.dto.UserBean;

public interface UserService {

	public Response login(String email, String password);

	public Response createUser(UserBean user);

	public Response updateUser(int employeeId, UserBean user);

	public Response updatePassword(String password, String email);

	public Response logout(HttpSession session);

	public Response getProfile(String email);

	public Response checkEmail(String email);
	
}//end of interface
