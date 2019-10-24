package com.taskmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.taskmanagement.dto.CreateTaskBean;
import com.taskmanagement.dto.ProjectBean;
import com.taskmanagement.dto.Response;
import com.taskmanagement.repository.ProjectRepository;

import javassist.bytecode.stackmap.BasicBlock.Catch;

public class ProjectServiceImpl implements ProjectService {

	@Autowired
	ProjectRepository repository;

	@Override
	public Response createProject(ProjectBean bean) {
		Response response = new Response();

		try {
			if (repository.findUserById(bean.getProjectPkBean())) {
				repository.save(bean);
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("project created successfully");
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("project id already exist ");
			}

		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

	@Override
	public Response updateProject(ProjectBean bean) {
		Response response = new Response();
		try {
			if (bean!=null) {
				repository.save(bean);
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("project updated successfully");
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("project data is null already exist ");
			}

		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;

	}
	
	@Override
	public Response getProject(int projectId) {
		Response response = new Response();
		
		  try { 
			  if (projectId!=0)
		  { 
			 response. setProjectBeans(repository.getAll(projectId)); 
		  response.setStatusCode(201);
		  response.setMessage("Success");
		  response.setDescription("project created successfully"); 
		  } 
		  else {
		  response.setStatusCode(401); 
		  response.setMessage("Failure");
		  response.setDescription("project id already exist "); 
		  }
		  
		  } catch (Exception e) { response.setDescription("Exception occured :-" +
		  e.getMessage()); response.setMessage("Exception");
		  response.setStatusCode(501); }
		 
		return response;

	}

}
