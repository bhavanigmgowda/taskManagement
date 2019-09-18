package com.taskmanagement.service;

import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanagement.dto.CreateTaskBean;
import com.taskmanagement.dto.Response;
import com.taskmanagement.dto.UserBean;
import com.taskmanagement.repository.TaskRepository;
import com.taskmanagement.repository.UserRepository;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	TaskRepository taskRepository;
	@Autowired
	UserRepository userRepository;
	
	@Override
	public Response createTask(String email, CreateTaskBean task, HttpServletRequest req) {
		Response response = new Response();
			if (userRepository.existsById(task.getUserBean().getEmployeeId()) && userRepository.existsByEmail(email)) {

				taskRepository.save(task);
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("Task added successfully");
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("user id does not exist ");
			}
		return response;
	}

	@Override
	public Response updateStatus(int taskId, String status, HttpServletRequest req) {
		CreateTaskBean taskbean = taskRepository.findById(taskId).get();
		Response response = new Response();
			if (taskbean != null) {
				taskbean.setStatus(status);
				taskRepository.save(taskbean);
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("Status Change successfully");

			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Status not Changed");
			}
		return response;
	}

	@Override
	public Response getAllTask(HttpServletRequest req) {
		Response response = new Response();
		if (req.getSession(false) != null) {
		if (taskRepository.findAll() != null) {
		response.setStatusCode(201);
		response.setMessage("Success");
		response.setDescription("Task data found successfully");
		List<CreateTaskBean> list = taskRepository.findAll();

		Collections.sort(list, ((o1, o2) -> {
		return o2.getAssignDate().compareTo(o1.getAssignDate());
		}));
		response.setTaskBean(list);

		return response;
		} else {
		response.setStatusCode(401);
		response.setMessage("Failure");
		response.setDescription("Task data not found");
		}
		} else {
		response.setStatusCode(501);
		response.setMessage("Login Failure");
		response.setDescription("LoginFirst");

		}
		return response;
	}

	@Override
	public Response getUserByName(String name, HttpServletRequest req) {
		Response response = new Response();

		if (req.getSession(false) != null) {
			if (userRepository.existsByEmployeeName(name) > 0) {
				List<UserBean> userBean = userRepository.findByEmployeeName(name);
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("Data found");

				response.setUserBean(userBean);
			} else {
				response.setStatusCode(401);
				response.setMessage("Failed");
				response.setDescription("Data is  not found");
			}
		} else {
			response.setStatusCode(501);
			response.setMessage("Login Failure");
			response.setDescription("Login First");
		}

		return response;
	}

	@Override
	public Response getTaskBySubject(String subject, HttpServletRequest req) {
		Response response = new Response();
		if (req.getSession(false) != null) {
			if (taskRepository.countSubject(subject) > 0) {
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("Task data found successfully");
				response.setTaskBean(taskRepository.getTaskBySubject(subject));
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Task data not found");
			}

		} else {
			response.setStatusCode(501);
			response.setMessage("Login Failure");
			response.setDescription("Login First");
		}

		return response;
	}

	@Override
	public Response getTaskByPriority(String priority, HttpServletRequest req) {
		Response response = new Response();
		if (req.getSession(false) != null) {
			if (taskRepository.countTask(priority) > 0) {
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("Task data found successfully");
				response.setTaskBean(taskRepository.getTaskByPriority(priority));
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Task data not found");
			}
		} else {
			response.setStatusCode(501);
			response.setMessage("Login Failure");
			response.setDescription("Login First");
		}

		return response;
	}

	@Override
	public Response getAssignToTask(String email, HttpServletRequest req) {
		Response response = new Response();
				if (userRepository.existsByEmail(email)) {
					response.setStatusCode(201);
					response.setMessage("Success");
					response.setDescription("All Task data assigned Found ");
					response.setTaskBean(taskRepository.getAssignTo(email));

					return response;
				} else {
					response.setStatusCode(401);
					response.setMessage("Failure");
					response.setDescription("Task data not found");
				}
			return response;
	}

	@Override
	public Response getAssignedTask(String email, HttpServletRequest req) {
		Response response = new Response();
				if (userRepository.existsByEmail(email)) {

					response.setStatusCode(201);
					response.setMessage("Success");
					response.setDescription("All Task Assigned Found Successfully");
					response.setTaskBean(taskRepository.getAssignedTask(email));

					return response;
				} else {
					response.setStatusCode(401);
					response.setMessage("Failure");
					response.setDescription("Task data not found");
				}
			return response;
	}

	@Override
	public Response searchBaseAll(String data, String email) {
		
		Response response = new Response();
		try {
			List<CreateTaskBean> createTaskBean = taskRepository.findBySearchTerm(data, email);
			if (!createTaskBean.isEmpty()) {
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("Task data found successfully");
				response.setTaskBean((createTaskBean));
				return response;
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Task data not found");
				return response;
			}
		} catch (Exception e) {
			response.setStatusCode(401);
			response.setMessage("Failure");
			response.setDescription("Task data not found");
			return response;
		}

	}
	
	
	

}
