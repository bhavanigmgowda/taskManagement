package com.taskmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagement.dto.ProjectBean;
import com.taskmanagement.dto.Response;
import com.taskmanagement.service.ProjectService;

@CrossOrigin(origins = "*")
@RestController
public class ProjectController {

	@Autowired
	ProjectService service;

	@PostMapping(value = "/create-project", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response createProject(@RequestBody ProjectBean bean) {
		System.out.println("================1" + bean);
		return service.createProject(bean);
	}

	@PostMapping(value = "/update-project", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response updateComment(@RequestParam("bean") ProjectBean bean) {
		return service.updateProject(bean);
	}

	@PostMapping(value = "/get-project", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response removeComment(@RequestParam("commentId") int projectId) {
		return service.getProject(projectId);
	}

	@GetMapping(value = "/get-members", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getAllMembers(@RequestParam("groupId") int groupId) {
		return service.getAllMembers(groupId);
	}

	@GetMapping(value = "/get-projects-by-email", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getProjectsById(@RequestParam("email") String email) {
		return service.getProjectsByEmail(email);
	}
	
	@GetMapping(value = "/search-members", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response searchMember(@RequestParam ("name") String name,@RequestParam ("groupId") int groupId) {
	return service.searchMember(name,groupId);
	}


	@GetMapping(value = "/search-members-universal", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response searchMemberUniversal(@RequestParam("name") String name) {
		return service.searchMemberUniversal(name);
	}

}
