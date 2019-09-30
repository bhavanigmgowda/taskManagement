package com.taskmanagement.service;


import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.taskmanagement.dto.CreateTaskBean;
import com.taskmanagement.dto.Response;

public interface TaskService {

	public Response createTask(@RequestParam("email") String email, @RequestBody CreateTaskBean task,
			HttpServletRequest req);

	public Response updateStatus(@RequestParam("taskId") int taskId, @RequestParam("status") String status,
			HttpServletRequest req);
	
	public Response updateCompletedDate(@RequestParam("taskId") int taskId, @RequestParam("status") String status,@RequestParam("status") String completedDate,
			HttpServletRequest req);

	public Response getAllTask(HttpServletRequest req);

	public Response getUserByName(@RequestParam("name") String name, HttpServletRequest req);

	public Response getTaskBySubject(@RequestParam("subject") String subject, HttpServletRequest req);

	public Response getTaskByPriority(@RequestParam("priority") String priority, HttpServletRequest req);

	public Response getAssignToTask(@RequestParam("email") String email, HttpServletRequest req);

	public Response getAssignedTask(@RequestParam("email") String email, HttpServletRequest req);

	public Response searchBaseAll(@RequestParam("search") String data, @RequestParam("email") String email);
	
	public Response getCompletedTaskByMe(@RequestParam("email") String email, @RequestParam("from") String from,HttpServletRequest req);
	
	public Response getCompletedTaskToMe(@RequestParam("email") String email, @RequestParam("from") String from,HttpServletRequest req);

	
	public Response searchTaskToMe(@RequestParam("search") String data, @RequestParam("email") String email);
	
	public Response searchTaskByMe(@RequestParam("search") String data,@RequestParam("email")String  email);
	
	public Response getCompletedTaskByDate(@RequestParam("from") String from,@RequestParam("to") String to,
											@RequestParam("email") String email,HttpServletRequest req);


	
	
}
