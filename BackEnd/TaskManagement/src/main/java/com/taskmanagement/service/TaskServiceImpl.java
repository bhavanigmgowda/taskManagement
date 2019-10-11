package com.taskmanagement.service;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanagement.dto.CreateTaskBean;
import com.taskmanagement.dto.Response;
import com.taskmanagement.repository.TaskRepository;
import com.taskmanagement.repository.UserRepository;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	TaskRepository taskRepository;
	@Autowired
	UserRepository userRepository;

	@Override
	public Response createTask(String email, CreateTaskBean task) {
		Response response = new Response();
		try {
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
		} catch (Exception e) {

			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

	@Override
	public Response updateStatus(int taskId, String status) {
		Response response = new Response();
		try {
			CreateTaskBean taskbean = taskRepository.findById(taskId).get();
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
		} catch (Exception e) {

			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

	@Override
	public Response getAssignToTask(String email) {
		Response response = new Response();
		try {
			if (userRepository.existsByEmail(email)) {
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("All Task data assigned Found ");
				response.setTaskBean(taskRepository.getAssignTo(email));

			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Task data not found");
			}
		} catch (Exception e) {

			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

	@Override
	public Response getAssignedTask(String email) {
		Response response = new Response();
		try {
			if (userRepository.existsByEmail(email)) {

				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("All Task Assigned Found Successfully");
				response.setTaskBean(taskRepository.getAssignedTask(email));

			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Task data not found");
			}
		} catch (Exception e) {

			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

	@Override
	public Response getCompletedTaskByMe(String email, String from) {
		Response response = new Response();
		try {
			if (userRepository.existsByEmail(email)) {
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("All Task data Assigned Found Successfully");
				TreeSet<CreateTaskBean> set = new TreeSet<>();
				List<String> endList = taskRepository.findEndDateByMe(email, from);
				ArrayList<CreateTaskBean> arrayList = new ArrayList<>();

				for (String i : endList) {
					System.out.println("end date" + endList);
					set.addAll(taskRepository.findCompletedTaskBySetByMe(email, i));

					arrayList.addAll(taskRepository.findCompletedTask(email, i));
					System.out.println(set);
				}

				response.setTaskBean(taskRepository.findCompletedByMe(email));

				response.setEnd(set);
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Task data not found");
			}
		} catch (Exception e) {

			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

	@Override
	public Response getCompletedTaskToMe(String email, String from) {
		Response response = new Response();
		try {
			if (userRepository.existsByEmail(email)) {
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("All Task data Assigned Found Successfully");
				TreeSet<CreateTaskBean> set = new TreeSet<>();
				List<String> endList = taskRepository.findEndDateToMe(email, from);
				ArrayList<CreateTaskBean> arrayList = new ArrayList<>();

				for (String i : endList) {
					set.addAll(taskRepository.findCompletedTaskBySetToMe(email, i));
					arrayList.addAll(taskRepository.findCompletedTask(email, i));
					System.out.println(set);
				}

				response.setTaskBean(taskRepository.findCompletedToMe(email));

				response.setEnd(set);
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Task data not found");
			}
		} catch (Exception e) {

			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

	@Override
	public Response searchTaskToMe(String data, String email) {
		Response response = new Response();
		try {
			if (taskRepository.countSubject(data) > 0 || taskRepository.countDescription(data) > 0) {
				response.setStatusCode(201);
				response.setMessage("success");
				response.setDescription("Task to me found successfully");
				response.setTaskBean(taskRepository.findToMe(data, email));
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Task data not found");
			}
		} catch (Exception e) {

			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

	@Override
	public Response searchTaskByMe(String data, String email) {
		Response response = new Response();
		try {
			if (taskRepository.countSubject(data) > 0 || taskRepository.countDescription(data) > 0) {
				response.setStatusCode(201);
				response.setMessage("success");
				response.setDescription("Task to me found successfully");
				response.setTaskBean(taskRepository.findByMe(data, email));
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Task data not found");
			}
		} catch (Exception e) {

			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

	@Override
	public Response getCompletedTaskByDate(String from, String to, String email) {
		Response response = new Response();
		try {
			if (userRepository.existsByEmail(email)) {

				response.setEnd(taskRepository.fromTo(email, from, to));
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("All Task data Assigned Found Successfully");

			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Task data not found");
			}
		} catch (Exception e) {

			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

	@Override
	public Response updateCompletedDate(int taskId, String status, String completedDate) {
		Response response = new Response();
		try {
			CreateTaskBean taskbean = taskRepository.findById(taskId).get();
			if (taskbean != null) {
				taskbean.setStatus(status);
				taskbean.setCompleted(completedDate);
				taskRepository.save(taskbean);
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("Status Change successfully");
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Status not Changed");
			}
		} catch (Exception e) {

			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;

	}

}