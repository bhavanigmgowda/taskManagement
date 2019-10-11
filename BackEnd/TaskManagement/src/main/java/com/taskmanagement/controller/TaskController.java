package com.taskmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagement.dto.CreateTaskBean;
import com.taskmanagement.dto.Response;
import com.taskmanagement.service.TaskService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TaskController {

	@Autowired
	private TaskService service;

	// Controller for creating tasks
	@PostMapping(value = "/create-task", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response createTask(@RequestParam("email") String email, @RequestBody CreateTaskBean task) {
		return service.createTask(email, task);
	}// End of createTask()

	// controller for updating the task status
	@PutMapping(value = "/update-task-status", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response updateStatus(@RequestParam("taskId") int taskId, @RequestParam("status") String status) {
		return service.updateStatus(taskId, status);
	}// End of updateStatus()

	// controller for setting completed date for task
	@PutMapping(value = "/update-task-completed-Date", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response updateCompletedDate(@RequestParam("taskId") int taskId, @RequestParam("status") String status,
			@RequestParam("completedDate") String completedDate) {
		return service.updateCompletedDate(taskId, status, completedDate);
	}// End ofupdateCompleteDate()

	// controller to get task based on task assigned to others
	@GetMapping(path = "/get-assign-to-task", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getAssignToTask(@RequestParam("email") String email) {
		return service.getAssignToTask(email);
	}// End of getAssignToTask()

	// controller for getting task based on task given to self
	@GetMapping(path = "/get-assigned-task", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getAssignedTask(@RequestParam("email") String email) {
		return service.getAssignedTask(email);
	}// End of getAssignedTask()

	// controller for getting completed task per endpdate
	@GetMapping(value = "/completed-task-by-me", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getCompletedTaskByMe(@RequestParam("email") String email, @RequestParam("from") String from) {
		return service.getCompletedTaskByMe(email, from);
	}// End of getCompletedTask()

	// controller for getting completed task per endpdate
	@GetMapping(value = "/completed-task-to-me", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getCompletedTaskToMe(@RequestParam("email") String email, @RequestParam("from") String from) {
		return service.getCompletedTaskByMe(email, from);
	}// End of getCompletedTask()

	@GetMapping(value = "/completed-task-from-to", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getCompletedTaskByDate(@RequestParam("from") String from, @RequestParam("to") String to,
			@RequestParam("email") String email) {
		return service.getCompletedTaskByDate(from, to, email);
	}// End of getCompletedTask()

	// controller for searching task which are assigned to me
	@GetMapping(value = "/search-task-to-me", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getTaskToMe(@RequestParam("email") String email, @RequestParam("searchTerm") String data) {
		return service.searchTaskToMe(data, email);
	}// End of getTaskToMe()

	// controller for searching task which are assigned by me to others
	@GetMapping(value = "/search-task-by-me", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getTaskByMe(@RequestParam("email") String email, @RequestParam("searchTerm") String data) {
		return service.searchTaskByMe(data, email);
	}// End of getTaskToMe()

}//End of class