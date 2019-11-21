package com.tyss.taskmanagement.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tyss.taskmanagement.dto.Response;
import com.tyss.taskmanagement.dto.TaskBean;
import com.tyss.taskmanagement.dto.UserBean;
import com.tyss.taskmanagement.repository.TaskRepository;
import com.tyss.taskmanagement.repository.UserRepository;
import com.tyss.taskmanagement.util.ResponseContainerutil;

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

	@Autowired
	private TaskRepository taskRepository;

	void login(String email) {
		LocalDate date = LocalDate.now();
		List<TaskBean> taskBeans = taskRepository.getAssignedTask(email);
		for (TaskBean bean : taskBeans) {

			int i = bean.getEndDate().compareTo(date);
			String priority = bean.getPriority();

			if (((i == 1 || i==0) && !priority.equals("critical")) || (i == 2 && !priority.equals("high"))
					|| ((i == 4 || i == 3) && !priority.equals("medium"))) {

				System.out.println(" before updated  " + i);
				System.out.println(" before updated  " + bean.getPriority());
				switch (i) {
				case 0: {
					taskRepository.updatePriority(bean.getTaskId(), "critical");
					break;
				}
				case 1: {
					taskRepository.updatePriority(bean.getTaskId(), "critical");
					break;
				}
				case 2: {
					if (!priority.equals("critical")) {
						taskRepository.updatePriority(bean.getTaskId(), "high");
					}
					break;
				}
				case 3: {
					if (!priority.equals("high") || !priority.equals("critical")) {
						taskRepository.updatePriority(bean.getTaskId(), "medium");
					}
					break;
				}
				case 4: {
					if (!priority.equals("high") || !priority.equals("critical")) {
						taskRepository.updatePriority(bean.getTaskId(), "medium");
					}

					break;
				}
				}

			}
		}
	}

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
		Response response = null;
	
			if (userRepository.existsByEmail(email)) {
				UserBean bean = userRepository.findByEmail(email).get();
				if (bean != null && bean.getPassword().equals(password)) {
					login(email);
					response=ResponseContainerutil.fillerSuccess("Login successfully");

					response.setUserBean(Arrays.asList(bean));
				} else {
					response=ResponseContainerutil.fillerFailure("Login Failed");
				}
			} else {
				
				response=Response.builder().statusCode(501).message("Failure").description("email does not exist").build();
			
			}
		System.out.println("respose"+response);
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
		Response response = null;
		try {
			if (!userRepository.existsByEmail(user.getEmail())) {
				userRepository.save(user);
				response=ResponseContainerutil.fillerSuccess("User added successfully");

			} else {
				response=ResponseContainerutil.fillerFailure("user id already exist");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
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
		Response response = null;
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
				response=ResponseContainerutil.fillerSuccess("User updated successfully");
			} else {
				response=ResponseContainerutil.fillerFailure("data not found for registered email ");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	}// End of updateUser()

	/**
	 * This method takes email value and password value and then checks whether
	 * email exists or not, If exists then password will be validated, then takes
	 * the new password checks whether new password is same as existing password if
	 * existing password is same as new password then returns {@code Response}
	 * object with status code 401 else updates the new password, if email doesn't
	 * exist returns {@code Response} object with status code 402
	 * 
	 * 
	 * @role implementation method of {@code UserService} interface
	 * @param email:    takes email value from request
	 * @param password: takes password value from request
	 * @return response object of {@code Response}
	 */
	@Override
	public Response updatePassword(String email, String password) {
		Response response = null;
		try {
			if (userRepository.existsByEmail(email)) {
				UserBean bean = userRepository.findByEmail(email).get();
				if (!(password.equals(bean.getPassword()))) {
					if (password != null && password.trim() != "") {
						bean.setPassword(password);
						userRepository.save(bean);
						response=ResponseContainerutil.fillerSuccess("Password was Changed");
					} else {
						response=ResponseContainerutil.fillerFailure("password did not change ");
					}
				} else {
					response=ResponseContainerutil.fillerFailure("Entered Password already exists!!!");
				}
			} else {
				response=ResponseContainerutil.fillerFailure("password did not change");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	}// End of updatePassword()

	/**
	 * logout service for session invalidation
	 * 
	 */
	@Override
	public Response logout(HttpSession session) {
		Response response = null;
		try {
			session.invalidate();
			response=ResponseContainerutil.fillerSuccess("Logout successfully");
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());

		}
		return response;
	}// End of logout()

	// Retrieve Profile Details
	@Override
	public Response getProfile(String email) {
		Response response = null;
		try {
			if (userRepository.existsByEmail(email)) {
				UserBean bean = userRepository.findByEmail(email).get();
				response=ResponseContainerutil.fillerSuccess("profile found successfully");
				response.setUserBean(Arrays.asList(bean));
			} else {
				response=ResponseContainerutil.fillerFailure("profile not found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());

		}
		return response;
	}// End of getProfile()

	/**
	 * This method will takes email from request and checks whether email exists or
	 * not, If exist send {@code Response} object with success code 201 else, send
	 * {@code Response} object with status code 401
	 * 
	 * @param email: takes email value from request
	 * @return response object of {@code Response}
	 */
	@Override
	public Response checkEmail(String email) {
		Response response = null;
		try {
			if (userRepository.existsByEmail(email)) {
				response=ResponseContainerutil.fillerSuccess("Email present");
			} else {
				response=ResponseContainerutil.fillerFailure("Email is not found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());

		}
		return response;
	}// End of checkEmail()

	@Override
	public Response getAllMemebers() {

		Response response = null;
		try {
			response=ResponseContainerutil.fillerSuccess("Users found");
			response.setUserBean(userRepository.findAll());
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	}

	@Override
	public Response getMemeber(String name) {

		Response response = null;
		try {
			if (name != null) {
				response=ResponseContainerutil.fillerSuccess("Users found");
				response.setUserBean(userRepository.getUser(name));
			} else {
				response=ResponseContainerutil.fillerFailure("Users Not found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());

		}
		return response;

	}

	@Override
	public Response getEmailsWhilesearch(String email) {
		Response response = null;
		List<String> emailList = userRepository.getEmailsWhileSearch(email);
		if (!emailList.isEmpty()) {
			response=ResponseContainerutil.fillerSuccess("email found");
			response.setEmailList(emailList);
		} else {
			response=ResponseContainerutil.fillerFailure("email not found");
		}

		return response;
	}

	@Override
	public Response getEmailsWhileCreatingTask(String email, int projectId) {
		Response response = null;
		List<String> emailList = userRepository.getEmailsWhileCreatingTask(email, projectId);
		if (!emailList.isEmpty()) {
			response=ResponseContainerutil.fillerSuccess("email found");
			response.setEmailList(emailList);
		} else {
			response=ResponseContainerutil.fillerFailure("email not found");
		}
		return response;
	}

}// End of class
