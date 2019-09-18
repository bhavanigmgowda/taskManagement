package com.taskmanagement.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.taskmanagement.dto.Response;
import com.taskmanagement.dto.UserBean;

public interface UserService {

	public Response login(@RequestParam("email") String email, @RequestParam("password") String password,
			HttpServletRequest req);

	public Response createUser(@RequestBody UserBean user);

	public Response updateUser(@RequestBody UserBean user);

	public Response updatePassword(@RequestParam("password") String password, @RequestParam("email") String email,
			HttpServletRequest req);

	public Response logout(HttpSession session);
}
