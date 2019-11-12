package com.taskmanagement.service;

import javax.servlet.http.HttpSession;

import com.taskmanagement.dto.Response;
import com.taskmanagement.dto.UserBean;

/**
 * @role UserService interface for performing login,save,update user details
 */
public interface UserService {

	/**
	 * @role abstract method for login
	 * @implementation {@code UserServiceImpl class}
	 * @param email:    takes email value from request
	 * @param password: takes password value from request
	 * @return response object of {@code Response}
	 */
	public Response login(String email, String password);

	/**
	 * @role abstract method for creating user
	 * @implementation {@code UserServiceImpl class}
	 * @param user: takes request body from request
	 * @return response object of {@code Response}
	 */
	public Response createUser(UserBean user);

	/**
	 * @role abstract method for updating user detail
	 * @implementation {@code UserServiceImpl class}
	 * @param employeeId: takes id value from request
	 * @param user:takes  user bean JSON object from request
	 * @return response object of {@code Response}
	 */
	public Response updateUser(int employeeId, UserBean user);

	/**
	 * @role abstract method for updating user password on request
	 * @implementation {@code UserServiceImpl class}
	 * @param password: takes password value from request
	 * @param email:    takes email value from request
	 * @return response object of {@code Response}
	 */
	public Response updatePassword(String password, String email);

	/**
	 * @role abstract method for logout
	 * @implementation {@code UserServiceImpl class}
	 * @param session : takes session value from request
	 * @return response object of {@code Response}
	 */
	public Response logout(HttpSession session);

	/**
	 * @role abstract method for getProfile
	 * @implementation: {@code UserServiceImpl class}
	 * @param email: takes email value from request
	 * @return response object of {@code Response}
	 */
	public Response getProfile(String email);

	/**
	 * @role abstract method for checking email whether exist or not
	 * @implementation: {@code UserServiceImpl class}
	 * @param email: takes email value from request
	 * @return response object of {@code Response}
	 */
	public Response checkEmail(String email);

	public Response getAllMemebers();

	public Response getMemeber(String name);

        public Response getEmailsWhileCreatingTask(String email,int projectId);

        public Response getEmailsWhilesearch(String email);

}// end of interface
