package com.tyss.taskmanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tyss.taskmanagement.dto.Response;
import com.tyss.taskmanagement.dto.TaskBean;
import com.tyss.taskmanagement.repository.ProjectRepository;
import com.tyss.taskmanagement.repository.TaskRepository;
import com.tyss.taskmanagement.repository.UserRepository;
import com.tyss.taskmanagement.util.ResponseContainerutil;

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
	
	@Autowired
	ProjectRepository projectRepository;

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
	public Response createTask(String email, TaskBean task) {
		Response response = null;

		if (userRepository.existsByEmail(email)) {
			if (taskRepository.getTaskCount(email) <= 15) {
				taskRepository.save(task);
				response=ResponseContainerutil.fillerSuccess("Task added successfully");
			}else {
				response=Response.builder().statusCode(402).message("Failure").description("user have already 15 tasks").build();
			}
		} else {
			response=ResponseContainerutil.fillerFailure("email id does not exists");
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
		Response response = null;
		try {
			TaskBean taskbean = taskRepository.findById(taskId).get();
			if (taskbean != null) {
				taskbean.setStatus(status);
				taskRepository.save(taskbean);
				response=ResponseContainerutil.fillerSuccess("Status Change successfully");
			} else {
				response=ResponseContainerutil.fillerFailure("Status not Changed");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
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
		Response response =null;
		 List<TaskBean> taskBeans= taskRepository.getAssignTo(email);
			if (!taskBeans.isEmpty()) {
				response=ResponseContainerutil.fillerSuccess("All Task data assigned Found ");
				response.setTaskBean(taskRepository.getAssignTo(email));
			} else {
				response=ResponseContainerutil.fillerFailure("Task data not found");
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
		Response response = null;
		try {
			List<TaskBean> beans=taskRepository.getAssignedTask(email);
			if (!beans.isEmpty()) {
				response=ResponseContainerutil.fillerSuccess("All Task Assigned Found Successfully");
				response.setTaskBean(beans);
			} else {
				response=ResponseContainerutil.fillerFailure("Task data not found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
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
		Response response = null;
		try {
			List<String> endList = taskRepository.findEndDateByMe(email, from);

			if (!endList.isEmpty()) {
				response=ResponseContainerutil.fillerSuccess("All Task Assigned Found Successfully");
				TreeSet<TaskBean> set = new TreeSet<>();
				for (String i : endList) {
					set.addAll(taskRepository.findCompletedTaskBySetByMe(email, i));
				}
				response.setTaskBean(taskRepository.findCompletedByMe(email));
				response.setEnd(set);
			} else {
				response=ResponseContainerutil.fillerFailure("Task data not found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
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
		Response response = null;
		try {
			if (userRepository.existsByEmail(email)) {
				response=ResponseContainerutil.fillerSuccess("All Task Assigned Found Successfully");
				TreeSet<TaskBean> set = new TreeSet<>();
				List<String> endList = taskRepository.findEndDateToMe(email, from);

				for (String i : endList) {
					set.addAll(taskRepository.findCompletedTaskBySetToMe(email, i));
				}
				response.setTaskBean(taskRepository.findCompletedToMe(email));
				response.setEnd(set);
			} else {
				response=ResponseContainerutil.fillerFailure("Task data not found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());

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
		Response response = null;
		try {
			if (taskRepository.countSubject(data) > 0 || taskRepository.countDescription(data) > 0) {
				response=ResponseContainerutil.fillerSuccess("Task to me found successfully");
				response.setTaskBean(taskRepository.findToMe(data, email));
			} else {
				response=ResponseContainerutil.fillerFailure("Task data not found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
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
		Response response = null;
		try {
			if (taskRepository.countSubject(data) > 0 || taskRepository.countDescription(data) > 0) {
				response=ResponseContainerutil.fillerSuccess("Task to me found successfully");
				response.setTaskBean(taskRepository.findByMe(data));
			} else {
				response=ResponseContainerutil.fillerFailure("Task data not found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
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
		Response response = null;
		try {
			if (userRepository.existsByEmail(email)) {
				response=ResponseContainerutil.fillerSuccess("Task to me found successfully");
				response.setEnd(taskRepository.fromTo(email, from, to));
			} else {
				response=ResponseContainerutil.fillerFailure("Task data not found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
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
		Response response = null;
		try {
			TaskBean taskbean = taskRepository.findById(taskId).get();
			if (taskbean != null) {
				taskbean.setStatus(status);
				taskbean.setCompleted(completedDate);
				taskRepository.save(taskbean);
				response=ResponseContainerutil.fillerSuccess("Status Change successfully");
			} else {
				response=ResponseContainerutil.fillerFailure("Status not Changed");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	}// End of updateCompletedDate()

	@Override
	public Response removeTask(int taskId) {
		Response response = null;
		try {
			TaskBean taskbean = taskRepository.findById(taskId).get();
			if (taskbean.getTaskId().equals(taskId) && taskId != 0) {
				taskRepository.deleteById(taskId);
				response=ResponseContainerutil.fillerSuccess("Task Removed successfully");
			} else {
				response=ResponseContainerutil.fillerFailure("taskId not Found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	}// End of removeTask()

	/**
	 * @role handler for updating task from one user to another user
	 * @param taskId: takes taskId which has to be updated
	 * @param email:  takes email to which the task has to be assigned
	 * @return response object
	 */
	@Override
	public Response getTaskForProject(int projectId,String email) {
		Response response = null;

		if (!taskRepository.findProject(projectId).isEmpty()) {
			response=ResponseContainerutil.fillerSuccess("All Task Assigned Found Successfully");
			response.setBean(userRepository.getUserBean(email).get());
			response.setTaskBean(taskRepository.findProject(projectId));
		} else {
			response=ResponseContainerutil.fillerFailure("taskId not Found");
		}
		return response;
	}

	@Override
	public Response getCompletedTaskForProject(int pid, String from) {
			Response response=null;
			List<TaskBean> beans =taskRepository.findCompletedForProject(pid);
			System.out.println("beans=============="+beans);
			if (!beans.isEmpty()) {
				response=ResponseContainerutil.fillerSuccess("All Task Assigned Found Successfully");
				response.setTaskBean(beans);
				response.setEnd(taskRepository.findCompletedDateForProject(pid, from));
			} else {
				response=ResponseContainerutil.fillerFailure("Task data not Found");
			}
			return response;		
	}
	
	@Override
	public Response getCompletedProjectTaskByDate(String from, String to, int projectId) {
		Response response = null;
		try {
			Set<TaskBean> beans=taskRepository.fromTo(projectId, from, to);
			if (!beans.isEmpty()) {
				response=ResponseContainerutil.fillerSuccess("All Task Assigned Found Successfully");
				response.setEnd(beans);
			} else {
				response=ResponseContainerutil.fillerFailure("Task data not Found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	}// End of getCompletedTaskByDate()
	
	@Override
	public Response  updateTaskInfo( int taskId, String description, String assignedTo, String deadLine, String priority, String subject) {
		Response response = null;
		try {
			TaskBean taskbean = taskRepository.findById(taskId).get();
			if (taskbean != null) {
				System.out.println("assignedTo"+assignedTo);
				LocalDate localDate = LocalDate.parse(deadLine);
				taskbean.setDescription(description);
				taskbean.setAssignedTo(assignedTo);
				taskbean.setSubject(subject);
				taskbean.setEndDate(localDate);
				taskbean.setPriority(priority);
				taskRepository.save(taskbean);
				response=ResponseContainerutil.fillerSuccess("Status Change successfully");
			} else {
				response=ResponseContainerutil.fillerFailure("Status not Changed");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	}

}// End of TaskServiceImpl()