package com.taskmanagement.controller;

/**
 *@role class for creating, managing, updating task in task management application
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagement.dto.CreateTaskBean;
import com.taskmanagement.dto.Response;
import com.taskmanagement.service.TaskService;

@CrossOrigin(origins = "*")
@RestController
public class TaskController {
	/**
	 * @role service is autowired for creating object for Task service and inject the bean
	 */
	@Autowired
	private TaskService service;
	
	
	/**
	 * @role handler for creating tasks
	 * @param email: takes email value of task creator from request
	 * @param task: takes task object form request
	 * @return response object service.createTask(email,task)
	 */
	@PostMapping(value = "/create-task", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response createTask(@RequestParam("email") String email, @RequestBody CreateTaskBean task) {
		return service.createTask(email, task);
	}// End of createTask()

	/**
	 * @role  handler for updating the task status
	 * @param taskId: takes task id from request
	 * @param status: takes value of status from request for updation
	 * @return response object from service.updateStatus(taskId, status) 
	 */
	@PutMapping(value = "/update-task-status", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response updateStatus(@RequestParam("taskId") int taskId, @RequestParam("status") String status) {
		return service.updateStatus(taskId, status);
	}// End of updateStatus()
	
	/**
	 * @role handler for setting completed date for task
	 * @param taskId: takes task id from request 
	 * @param status: takes status value from request 
	 * @param completedDate takes completed date value from request
	 * @return response object from service.updateCompletedDate(taskId, status, completedDate)
	 */
	@PutMapping(value = "/update-task-completed-Date", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response updateCompletedDate(@RequestParam("taskId") int taskId, @RequestParam("status") String status,
			@RequestParam("completedDate") String completedDate) {
		return service.updateCompletedDate(taskId, status, completedDate);
	}// End ofupdateCompleteDate()
	
	/**
	 * @role handler to get task based on task assigned to others
	 * @param email: takes email from request
	 * @return response object from service.getAssignToTask(email)
	 */
	@GetMapping(path = "/get-assign-to-task", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getAssignToTask(@RequestParam("email") String email) {
		return service.getAssignToTask(email);
	}// End of getAssignToTask()
	
	/**
	 * @role handler for getting task based on task given to self
	 * @param email: takes email value from request
	 * @return response object from service.getAssignedTask(email)
	 */
	@GetMapping(path = "/get-assigned-task", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getAssignedTask(@RequestParam("email") String email) {
		return service.getAssignedTask(email);
	}// End of getAssignedTask()
	
	/**
	 * @role handler for getting completed task assigned by current user
	 * @param email: takes email value from request
	 * @param from: takes date value from request
	 * @return response object from service.get
	 */
	@GetMapping(value = "/completed-task-by-me", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getCompletedTaskByMe(@RequestParam("email") String email, @RequestParam("from") String from) {
		return service.getCompletedTaskByMe(email, from);
	}// End of getCompletedTask()
	
	/**
	 * @role handler for getting completed task assigned by other user
	 * @param email: takes email value from request
	 * @param from: takes date value from request
	 * @return response object from service.getCompletedTaskToMe(email,from)
	 */
	@GetMapping(value = "/completed-task-to-me", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getCompletedTaskToMe(@RequestParam("email") String email, @RequestParam("from") String from) {
		return service.getCompletedTaskByMe(email, from);
	}// End of getCompletedTask()
	
	/**
	 * @role handler for getting completed task based on date(from and to) range
	 * @param from: takes from date value from request 
	 * @param to: takes to date value from request
	 * @param email: takes email value from request
	 * @return response object from service.getCompletefTaskByDate(from,to,email)
	 */
	@GetMapping(value = "/completed-task-from-to", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getCompletedTaskByDate(@RequestParam("from") String from, @RequestParam("to") String to,
			@RequestParam("email") String email) {
		return service.getCompletedTaskByDate(from, to, email);
	}// End of getCompletedTask()
	
	/**
	 * @role  handler for searching task which are assigned to me
	 * @param email: takes email value from request
	 * @param data: takes search data value from request
	 * @return response object from service.searchTaskToMe(data,email)
	 */
	@GetMapping(value = "/search-task-to-me", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getTaskToMe(@RequestParam("email") String email, @RequestParam("searchTerm") String data) {
		return service.searchTaskToMe(data, email);
	}// End of getTaskToMe()
	
	/**
	 * @role handler for searching task which are assigned by me to others
	 * @param email: takes email value from request
	 * @param data: takes search data value from request
	 * @return response object from service.serachTaskByMe(data,email)
	 */
	@GetMapping(value = "/search-task-by-me", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getTaskByMe(@RequestParam("email") String email, @RequestParam("searchTerm") String data) {
		return service.searchTaskByMe(data, email);
	}// End of getTaskToMe()
	
	/**
	 * @role handler for deleting task
	 * @param taskId: takes taskId from request
	 * @return response object from service.removeTask(taskId)
	 */
	@DeleteMapping(value = "/remove-task", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response removeTask(@RequestParam("taskId")int taskId) {
		return service.removeTask(taskId);
	}
	
	@GetMapping(path = "/get-task-for-project", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getTaskForProject(@RequestParam("groupId") int groupId,@RequestParam("email") String email) {
		return service.getTaskForProject(groupId,email);
	}// End of getAssignToTask()
	
	@GetMapping(value = "/completed-project-task", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getCompletedTaskForProject( @RequestParam("projectId") int ProjectId, @RequestParam("from") String from) {
		return service.getCompletedTaskForProject(ProjectId, from);
	}// End of getCompletedTask()
	
	@GetMapping(value = "/completed-project-task-from-to", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getCompletedProjectTaskByDate(@RequestParam("projectId") int projectId, @RequestParam("from") String from, @RequestParam("to") String to
			) {
		return service.getCompletedProjectTaskByDate(from, to, projectId);
	}// End of getCompletedTask()
	
	@PutMapping(value = "/update-task-info", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response updateStatus(@RequestParam("taskId") int taskId, @RequestParam("description") String description, @RequestParam("assignedTo") String assignedTo,
			 @RequestParam("deadLine") String deadLine, @RequestParam("priority") String priority, @RequestParam("subject") String subject) {
		return service.updateTaskInfo(taskId, description, assignedTo, deadLine, priority,subject);
	}// End of updateStatus()
	
	
	

}//End of class