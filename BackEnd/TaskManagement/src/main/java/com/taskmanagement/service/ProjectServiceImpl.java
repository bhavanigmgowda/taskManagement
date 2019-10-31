package com.taskmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanagement.dto.ProjectBean;
import com.taskmanagement.dto.ProjectPKBean;
import com.taskmanagement.dto.Response;
import com.taskmanagement.dto.UserBean;
import com.taskmanagement.repository.ProjectRepository;
import com.taskmanagement.repository.UserRepository;

@Service
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	ProjectRepository repository;

	@Autowired
	UserRepository userRepository;

	private static boolean isExcecuted = false;

	@Override
	public Response createProject(ProjectBean bean, int count) {
		Response response = new Response();
		if (repository.findById(bean.getProjectPkBean()) != null) {
			if (!isExcecuted) {
				System.out.println("executed :" + repository.alterProjectId());
				isExcecuted = true;
			}
			if (count > 0) {
				bean.getProjectPkBean().setProjectId(bean.getProjectPkBean().getProjectId());
			}
			repository.save(bean);
			response.setStatusCode(201);
			response.setMessage("Success");
			response.setDescription("project created successfully");
		} else {
			response.setStatusCode(401);
			response.setMessage("Failure");
			response.setDescription("project id already exist ");
		}

		return response;
	}

	@Override
	public Response addMemeber(String architectEmail , int groupId, String userEmail ) {
		Response response = new Response();
		if (repository.findProjectById(groupId) >= 0) {
			ProjectBean bean = repository.getProjectsByEmaill(architectEmail, groupId).get();
			ProjectPKBean pkBean = bean.getProjectPkBean();
			System.out.println("==================="+bean.getProjectPkBean().getUserBean().getEmail());
			UserBean userBean = userRepository.getId(userEmail).get();
			pkBean.setUserBean(userBean);
			bean.setProjectPkBean(pkBean);
			System.out.println("==================="+bean.getProjectPkBean().getUserBean().getEmail());
			repository.save(bean);
			response.setStatusCode(201);
			response.setMessage("Success");
			response.setDescription("user is added successfully");
		} else {
			response.setStatusCode(401);
			response.setMessage("Failure");
			response.setDescription("project id already exist ");
		}

		return response;
	}

	@Override
	public Response updateProject(ProjectBean bean) {
		Response response = new Response();
		try {
			if (bean != null) {
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
			if (projectId != 0) {
				response.setProjectBeans(repository.getAll(projectId));
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
	public Response getAllMembers(int groupId) {
		Response response = new Response();
		try {
			if (repository.findProjectById(groupId) >= 1) {
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

	@Override
	public Response getProjectsByEmail(String email) {
		Response response = new Response();
		try {
			if (repository.getProjectsByEmail(email) >= 1) {
				response.setStatusCode(201);
				response.setDescription("projects found successfully");
				response.setProjectBeans(repository.getProjectsByEmaill(email));
			} else {
				response.setStatusCode(401);
				response.setDescription("projects not found");
			}
		} catch (Exception e) {
			response.setDescription("Exception occured");
			response.setStatusCode(501);
		}

		return response;
	}

	@Override
	public Response searchMember(String name, int groupId) {
		Response response = new Response();
		List<ProjectBean> projectBean = repository.searchMember(name, groupId);
		if (!projectBean.isEmpty()) {
			response.setStatusCode(201);
			response.setDescription("members found successfully");
			response.setProjectBeans(projectBean);
		} else {
			response.setStatusCode(401);
			response.setDescription("members not found ");
		}
		return response;
	}

}
