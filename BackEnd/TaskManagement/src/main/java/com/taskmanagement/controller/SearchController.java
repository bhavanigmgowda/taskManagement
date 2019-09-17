package com.taskmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagement.dto.CreateTaskBean;
import com.taskmanagement.repo.TaskRepository;
import com.taskmanagement.repo.UserRepository;
import com.taskmanagement.response.Response;

@RestController
@CrossOrigin(origins = "*")
public class SearchController {

	@Autowired
	UserRepository repository;
	@Autowired
	TaskRepository taskRepo;

	@GetMapping(path = "/getUserByName", produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getUserByName(@RequestParam("name") String name) {
		Response responseData = new Response();
		/*
		 * if(repository.existsByName(name)) { responseData.setStatusCode(201);
		 * responseData.setMessage("Successsfull");
		 * responseData.setDescription("Data is  found");
		 * responseData.setUserBean((repository.findByEmpName(name))); } else {
		 * responseData.setStatusCode(401); responseData.setMessage("Failed");
		 * responseData.setDescription("Data is  not found"); }
		 */
		return responseData;
	}

	@GetMapping(path = "/searchAll", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public Response searchBaseAll(@RequestParam("search") String data, @RequestParam("email") String email) {
		Response response = new Response();
		try {
			List<CreateTaskBean> ctb = taskRepo.findBySearchTerm(data, email);
			if (!ctb.isEmpty()) {
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("Task data found successfully");
				response.setTaskBean((ctb));
				return response;
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("Task data not found");
				return response;
			}
		} catch (Exception e) {
			response.setStatusCode(401);
			response.setMessage("Failure");
			response.setDescription("Task data not found");
			return response;
		}

	}

}
