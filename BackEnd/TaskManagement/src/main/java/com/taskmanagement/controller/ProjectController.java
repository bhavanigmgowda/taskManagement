package com.taskmanagement.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.taskmanagement.dto.CommentBean;
import com.taskmanagement.dto.ProjectBean;
import com.taskmanagement.dto.Response;
import com.taskmanagement.service.ProjectService;

public class ProjectController {

	ProjectService service;
	
	@PostMapping(value = "/create-project",produces = MediaType.APPLICATION_JSON_VALUE )
	public Response createProject(@RequestParam("bean") ProjectBean  bean) {
		return service.createProject(bean);
	}
	
	@PostMapping(value = "/update-project",produces = MediaType.APPLICATION_JSON_VALUE )
	public Response updateComment(@RequestParam("bean") ProjectBean bean) {
		return service.updateProject(bean);
	}
	
	@PostMapping(value = "/get-project",produces = MediaType.APPLICATION_JSON_VALUE )
	public Response removeComment(@RequestParam("commentId") int projectId) {
		return service.getProject(projectId);
	}
}
