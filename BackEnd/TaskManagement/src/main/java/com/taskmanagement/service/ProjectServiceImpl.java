package com.taskmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.taskmanagement.dto.ProjectBean;
import com.taskmanagement.dto.Response;
import com.taskmanagement.repository.ProjectRepository;


public class ProjectServiceImpl implements ProjectService {

	@Autowired
	ProjectRepository repository;

	@Override
	public Response createProject(ProjectBean bean) {
		Response response = new Response();

		try {
			if (!repository.findUserById(bean.getProjectPkBean())) {
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


	@Override
	public Response getAllMembers(int groupId) {
		Response response = new Response();
		try {
			if (repository.findProjectById(groupId)>=1) {
				List<ProjectBean> projectBean = repository.getAllMembers(groupId);
				response.setMessage("members found successfully");
				response.setStatusCode(201);
				response.setProjectBeans(projectBean);
				
			} else {
				response.setStatusCode(401);
				response.setMessage("members not found");
			}
		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

}
