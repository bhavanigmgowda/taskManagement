package com.taskmanagement.service;

import java.util.Arrays;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.taskmanagement.dto.Response;
import com.taskmanagement.dto.UserBean;
import com.taskmanagement.repository.UserRepository;

/**
 * 
 * DAO Layer for UserService Interface UserServiceImpl implementation class for
 * {@interface UserService}
 *
 */
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	/**
	 * Takes email and password from request and check whether entered email and
	 * password is valid If valid send Response with status code 201 containing
	 * Response object of {@code Response}, Otherwise If invalid send Response with
	 * 401 containing Response object of {@code Response}
	 * 
	 * @role implementation method of {@code UserService interface}
	 * @param email:    takes email value from request
	 * @param password: takes password value from request
	 * @return response object of {@code Response}
	 */
	@Override
	public Response login(String email, String password) {
		Response response = new Response();
		try {
			if (userRepository.existsByEmail(email)) {
				UserBean bean = userRepository.findByEmail(email).get();
				if (bean != null && bean.getPassword().equals(password)) {
					response.setStatusCode(201);
					response.setMessage("Success");
					response.setDescription("Login successfully");
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
		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}// End of login()

	/**
	 * Takes UserBean JSON object from request and check whether email exist or
	 * doesn't exist If exist send Response with 401 containing Response object of
	 * {@code Response}, Otherwise If doesn't exist send Response with status code
	 * 201 containing Response object of {@code Response}
	 * 
	 * @role implementation method of {@code UserService} interface
	 * @param email:    takes email value from request
	 * @param password: takes password value from request
	 * @return response object of {@code Response}
	 */
	@Override
	public Response createUser(UserBean user) {
		Response response = new Response();
		try {
			if (!userRepository.existsByEmail(user.getEmail())) {
				userRepository.save(user);
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("User added successfully");
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("user id already exist ");
			}
		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}// End of createUser()

	/**
	 * Takes UserBean JSON object and employeeId from request and check whether
	 * employeeId exist or doesn't exist If exist send Response with 401 containing
	 * Response object of {@code Response}, Otherwise If doesn't exist send Response
	 * with status code 201 containing Response object of {@code Response}
	 * 
	 * @role implementation method of {@code UserService} interface
	 * @param employeeId: takes employeeId value from request
	 * @param user:       takes UserBean object from request
	 * @return response object of {@code Response}
	 */
	@Override
	public Response updateUser(int employeeId, UserBean user) {
		Response response = new Response();
		try {
			if (userRepository.existsById(user.getEmployeeId())) {

				UserBean bean = userRepository.findById(user.getEmployeeId()).get();
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
				userRepository.save(bean);
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("User updated successfully");
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("data not found for registered email ");
			}
		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}// End of updateUser()

	/**
	 * This method takes email value and password value and then checks whether
	 * email exists or not, If exists then password will be validated, then takes
	 * the new password checks whether new password is same as existing password if
	 * existing password is same as new password then returns {@code Response}
	 * object with status code 401 else updates the new password,
	 * if email doesn't exist returns {@code Response} object with status code 402
	 * 
	 * 
	 * @role implementation method of {@code UserService} interface
	 * @param email: takes email value from request
	 * @param password: takes password value from request
	 * @return response object of {@code Response}
	 */
	@Override
	public Response updatePassword(String email, String password) {
		Response response = new Response();
		try {
			if (userRepository.existsByEmail(email)) {
				UserBean bean = userRepository.findByEmail(email).get();
				if (!(password.equals(bean.getPassword()))) {
					if (password != null && password.trim() != "") {
						bean.setPassword(password);
						userRepository.save(bean);
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
		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}// End of updatePassword()

	
	/**  logout service for session invalidation
	 * 
	 */
	@Override
	public Response logout(HttpSession session) {
		Response response = new Response();
		try {
			session.invalidate();
			response.setStatusCode(201);
			response.setMessage("Success");
			response.setDescription("Logout successfully");
		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}// End of logout()

	// Retrieve Profile Details
	@Override
	public Response getProfile(String email) {
		Response response = new Response();
		try {
			if (userRepository.existsByEmail(email)) {
				UserBean bean = userRepository.findByEmail(email).get();
				response.setDescription("profile found successfully");
				response.setMessage("Success");
				response.setStatusCode(201);
				response.setUserBean(Arrays.asList(bean));
			} else {
				response.setDescription("profile not found ");
				response.setMessage("failure");
				response.setStatusCode(401);
			}
		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}// End of getProfile()
	
	/**This method will takes email from request and checks whether email exists or not,
	 * If exist send {@code Response} object with success code 201 else,
	 * send {@code Response} object with status code 401
	 * 
	 *  @param email: takes email value from request
	 *  @return response object of {@code Response}
	 */
	@Override
	public Response checkEmail(String email) {
		Response response = new Response();
		try {
			if (userRepository.existsByEmail(email)) {
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("Email present in database");
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Email is not found");
			}
		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}// End of checkEmail()

	@Override
	public Response getAllMemebers() {
		
		Response response = new Response();
		try {
			response.setUserBean(userRepository.findAll()); 
			response.setMessage("Success");
			response.setDescription("Users found");
			}
		 catch (Exception e) {
			 response.setDescription("Exception occured :-" + e.getMessage());
			 response.setMessage("Exception");
			 response.setStatusCode(501);
		}
		return response;
	}

	@Override
	public Response getMemeber(String name) {
		
		Response response = new Response();
		try {
			if(name!=null) {
			response.setUserBean(userRepository.getUser(name));
			response.setMessage("Success");
			response.setDescription("Users found");
			}
		else {
			response.setMessage("Success");
			response.setDescription("Users Not Found found");
			
		}
		}
		 catch (Exception e) {
			 response.setDescription("Exception occured :-" + e.getMessage());
			 response.setMessage("Exception");
			 response.setStatusCode(501);
		}
		return response;
		
	}

}// End of class
