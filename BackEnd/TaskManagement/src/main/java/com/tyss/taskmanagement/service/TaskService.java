package com.tyss.taskmanagement.service;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.tyss.taskmanagement.dto.Response;
import com.tyss.taskmanagement.dto.TaskBean;

public interface TaskService {

	/**
	 * @role abstract method that creates the task for the given email
	 * @param email : email for which the task has to be created
	 * @param task  : bean containing information about the task
	 */
	public Response createTask(@RequestParam("email") String email, @RequestBody TaskBean task);

	/**
	 * @role : abstract method that updates the status of the task
	 * @param taskId : id to which the status has to be updated
	 * @param status : containing status information that has to be set to the
	 *               status field
	 */
	public Response updateStatus(@RequestParam("taskId") int taskId, @RequestParam("status") String status);

	/**
	 * @role: abstract method that updates the completed task
	 * @param taskId:        takes id from request
	 * @param status:        status of task value from request
	 * @param completedDate: takes date value from request
	 */
	public Response updateCompletedDate(@RequestParam("taskId") int taskId, @RequestParam("status") String status,
			@RequestParam("status") String completedDate);

	/**
	 * @role : abstract method that fetches the tasks assigned to the user of the
	 *       given email
	 * @param email : email for which the tasks has to be fetched
	 */
	public Response getAssignToTask(@RequestParam("email") String email);

	/**
	 * @role abstract method for retrieving assigned task
	 * @param email : email to which the tasks are assigned
	 */
	public Response getAssignedTask(@RequestParam("email") String email);

	/**
	 * @role abstract method retrieving completed task set by user
	 * @param email : takes email value from request
	 * @param from  : date value from request
	 */
	public Response getCompletedTaskByMe(@RequestParam("email") String email, @RequestParam("from") String from);

	/**
	 * @role abstract method for getting completed task assigned by current user
	 * @param email: takes email value from request
	 * @param from:  takes date value from request
	 */
	public Response getCompletedTaskToMe(@RequestParam("email") String email, @RequestParam("from") String from);

	/**
	 * @role abstract method for searching task which are assigned to me
	 * @param email: takes email value from request
	 * @param data:  takes search data value from request
	 */
	public Response searchTaskToMe(@RequestParam("search") String data, @RequestParam("email") String email);

	/**
	 * @role abstract method for searching task which are assigned by me to others
	 * @param email: takes email value from request
	 * @param data:  takes search data value from request
	 */
	public Response searchTaskByMe(@RequestParam("search") String data, @RequestParam("email") String email);

	/**
	 * @role abstract method for getting completed task based on date(from and to)
	 *       range
	 * @param from:  takes from date value from request
	 * @param to:    takes to date value from request
	 * @param email: takes email value from request
	 */
	public Response getCompletedTaskByDate(@RequestParam("from") String from, @RequestParam("to") String to,
			@RequestParam("email") String email);

	/**
	 * @role abstract method for removing unnecessary task
	 * @param taskId: takes taskid from request
	 */
	public Response removeTask(@RequestParam("taskId") int taskId);

	public Response getTaskForProject(@RequestParam("projectId") int pid, @RequestParam("email") String email);

	public Response getCompletedTaskForProject(@RequestParam("projectId") int pid, @RequestParam("from") String from);
	
	public Response getCompletedProjectTaskByDate(@RequestParam("from") String from, @RequestParam("to") String to,int ProjectId);
	
	public Response updateTaskInfo(@RequestParam("taskId") int taskId,@RequestParam("description") String description,  @RequestParam("assignedTo") String assignedTo,
			 @RequestParam("deadLine") String deadLine, @RequestParam("priority") String priority,  @RequestParam("subject") String subject);


}// end of interface