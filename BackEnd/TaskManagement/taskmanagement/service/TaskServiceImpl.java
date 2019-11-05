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

/**
 *
 * TaskServiceImpl class is implementation of TaskService interface This class
 * contains all the logics related to tasks to interact with the database
 */
@Service
public class TaskServiceImpl implements TaskService {

	/**
	 * @role taskRepository is autowired for creating bean for Task Repository and
	 *       inject the bean
	 */
	@Autowired
	TaskRepository taskRepository;
	@Autowired
	/**
	 * @role userRepository is autowired for creating bean for UserRepository and
	 *       inject the bean
	 */
	UserRepository userRepository;

	/**
	 * This method accepts email and taskBean as inputs and checks email is valid or
	 * not if it is valid,it creates a task for the given email and sets the
	 * statusCode to 201 in the {@code Response} else, sets the statusCode to 401 in
	 * the {@code Response}
	 *
	 * @role method that creates the task for the given email
	 * @param email : email for which the task has to be created
	 * @param task  : bean containing information about the task
	 * @return Response : bean that contains the response information
	 */
	@Override
	public Response createTask(String email, CreateTaskBean task) {
		Response response = new Response();
		System.out.println("========="+task);
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

	/**
	 * This method accepts taskId and status as inputs and checks taskId is valid or
	 * not if the taskId is valid, it fetches the bean from the database and updates
	 * the status and sets the statusCode to 201 in the {@code Response} if the
	 * taskId is invalid, it sets the statusCode to 401 in the {@code Response
	 *
	 * @role : method that updates the status of the task
	 * 
	 * @param taskId : id to which the status has to be updated
	 * @param status : containing status information that has to be set to the
	 *               status field
	 * @return Response : bean that contains the response information
	 */
	@Override
	public Response updateStatus(int taskId, String status) {
		Response response = new Response();
			CreateTaskBean taskbean = taskRepository.findById(taskId).get();
			if (taskbean != null) {
				taskbean.setStatus(status);
				
				taskRepository.update(taskId,status);
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

	/**
	 * This method accepts email as input and checks email is valid or not if it is
	 * valid, it fetches all the tasks assigned to that email and stores all the
	 * tasks in the {@code Response} and sets the statusCode to 201 in the
	 * {@code Response} else, it sets the statusCode to 401 in the {@code Response}
	 *
	 * @role : method that fetches the tasks assigned to the user of the given email
	 * @param email : email for which the tasks has to be fetched
	 * @return Response : bean that contains the response information
	 */
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
	}// End of

	/**
	 * This method check whether email exists in database if exist then returns all
	 * assigned task assigned to user of that email otherwise, Returns status code
	 * with 401 along with error response object
	 * 
	 * @role abstract method for retrieving assigned task
	 * @param email : email to which the tasks are assigned
	 * @Response : bean that contains the response information
	 */
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
	}// End of getAssignedTask()

	/**
	 * Service method takes email and from and return completed task which were
	 * completed in one week duration and return response object
	 * 
	 * @role method retrieving completed task set by user
	 * @param email :
	 * @param from  : date
	 * @return Response : bean that contains the response information
	 */
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
	}// End of getCompletedTaskByMe()

	/**
	 * This method takes email value and from date value from request and returns
	 * all completed task that are completed by current user
	 * 
	 * 
	 * @role method for getting completed task assigned by other user
	 * @param email: takes email value from request
	 * @param from:  takes date value from request
	 * @return response object from service.getCompletedTaskToMe(email,from)
	 */
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
	}// End of getCompletedTaskToMe()

	/**
	 * @role handler for searching task which are assigned to me
	 * @param email: takes email value from request
	 * @param data:  takes search data value from request
	 * @return response object from service.searchTaskToMe(data,email)
	 */
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
	}// End of searchTaskToMe()

	/**
	 * @role handler for searching task which are assigned by me to others
	 * @param email: takes email value from request
	 * @param data:  takes search data value from request
	 * @return response object from service.serachTaskByMe(data,email)
	 */
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
	}// End of searchTaskByMe()

	/**
	 * @role handler for getting completed task based on date(from and to) range
	 * @param from:  takes from date value from request
	 * @param to:    takes to date value from request
	 * @param email: takes email value from request
	 * @return response object from service.getCompletefTaskByDate(from,to,email)
	 */
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
	}// End of getCompletedTaskByDate()

	/**
	 * @role method for setting completed date for task
	 * @param taskId:       takes task id from request
	 * @param status:       takes status value from request
	 * @param completedDate takes completed date value from request
	 * @return response object from service.updateCompletedDate(taskId, status,
	 *         completedDate)
	 */
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
	}// End of updateCompletedDate()

	@Override
	public Response removeTask(int taskId) {
		Response response = new Response();
		try {
			CreateTaskBean taskbean = taskRepository.findById(taskId).get();
			if (taskbean.getTaskId().equals(taskId) && taskId != 0) {
				taskRepository.deleteById(taskId);
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("Task Removed successfully");
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("taskId not Found");
			}
		} catch (Exception e) {
			response.setStatusCode(501);
			response.setMessage("Exception");
			response.setDescription("Exception occured :-" + e.getMessage());
		}
		return response;
	}// End of removeTask()

	@Override
	public Response getTaskForProject(int projectId) {
		Response response = new Response();

		if (!taskRepository.findProject(projectId).isEmpty()) {
			response.setStatusCode(201);
			response.setMessage("Success");
			response.setDescription("All Task Assigned Found Successfully");
			response.setTaskBean(taskRepository.findProject(projectId));
		} else {
			response.setStatusCode(401);
			response.setMessage("Failure");
			response.setDescription("no task found Found");
		}

		return response;
	}


	@Override
	public Response getCompletedTaskForProject(int projectId, String from) {
		Response response = new Response();
		try {
			List<CreateTaskBean> createTaskBeans = taskRepository.findCompletedProject(projectId);
			if (createTaskBeans.isEmpty()) {
					response.setMessage("Success");
					response.setDescription("All Task data Assigned Found Successfully");
					TreeSet<CreateTaskBean> set = new TreeSet<>();
					List<String> endList = taskRepository.findEndDateProject(projectId, from);
					response.setEndDate(endList);
					response.setTaskBean(createTaskBeans);
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

}// End of TaskServiceImpl()
