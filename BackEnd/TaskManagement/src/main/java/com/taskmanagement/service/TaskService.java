package com.taskmanagement.service;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.taskmanagement.dto.CreateTaskBean;
import com.taskmanagement.dto.Response;

public interface TaskService {

	public Response createTask(@RequestParam("email") String email, @RequestBody CreateTaskBean task);

	public Response updateStatus(@RequestParam("taskId") int taskId, @RequestParam("status") String status);

	public Response updateCompletedDate(@RequestParam("taskId") int taskId, @RequestParam("status") String status,
			@RequestParam("status") String completedDate);

	public Response getAssignToTask(@RequestParam("email") String email);

	public Response getAssignedTask(@RequestParam("email") String email);

	public Response getCompletedTaskByMe(@RequestParam("email") String email, @RequestParam("from") String from);

	public Response getCompletedTaskToMe(@RequestParam("email") String email, @RequestParam("from") String from);

	public Response searchTaskToMe(@RequestParam("search") String data, @RequestParam("email") String email);

	public Response searchTaskByMe(@RequestParam("search") String data, @RequestParam("email") String email);

	public Response getCompletedTaskByDate(@RequestParam("from") String from, @RequestParam("to") String to,
			@RequestParam("email") String email);

}//end of interface