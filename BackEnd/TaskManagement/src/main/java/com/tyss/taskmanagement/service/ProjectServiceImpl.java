package com.tyss.taskmanagement.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tyss.taskmanagement.dto.ProjectBean;
import com.tyss.taskmanagement.dto.Response;
import com.tyss.taskmanagement.dto.UserBean;
import com.tyss.taskmanagement.repository.ProjectRepository;
import com.tyss.taskmanagement.repository.UserRepository;
import com.tyss.taskmanagement.util.ResponseContainerutil;

@Service
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	ProjectRepository repository;

	@Autowired
	UserRepository userRepository;

	private static boolean isExcecuted = false;

	@Override
	public Response createProject(ProjectBean bean, int count) {
		Response response = null;

		if (bean != null) {
			if (!isExcecuted) {
				repository.alterProjectId();
				isExcecuted = true;
			}
			if (count > 0) {
				bean.getProjectPkBean().setProjectId(bean.getProjectPkBean().getProjectId());
			}
			bean = repository.save(bean);

			if (!repository.findByProjectName(bean.getProjectName()).isEmpty()) {
				response=ResponseContainerutil.fillerSuccess("project created successfully");

				response.setProjectBeans(repository.findByProjectName(bean.getProjectName()));
			}
			
			response=ResponseContainerutil.fillerSuccess("project created successfully");
		} else {
			response=ResponseContainerutil.fillerFailure("project id already exist ");
		}

		return response;
	}

	@Override
	public Response addMemeber(String architectEmail, int groupId, String userEmail) {
		Response response = null;

		if (repository.getProjectsByEmaill(userEmail, groupId).isEmpty()
				&& !userRepository.findByEmail(userEmail).isEmpty()) {
			ProjectBean bean = repository.getProjectsByEmaill(architectEmail, groupId).get();
			UserBean userBean = userRepository.getUserBean(userEmail).get();
			bean.getProjectPkBean().setUserBean(userBean);
			ProjectBean projectBean = new ProjectBean();
			projectBean.setCreatedDate(bean.getCreatedDate());
			projectBean.setDeadline(bean.getDeadline());
			projectBean.setDescription(bean.getDescription());
			projectBean.setProjectName(bean.getProjectName());
			projectBean.setProjectPkBean(bean.getProjectPkBean());
			repository.save(projectBean);
			response=ResponseContainerutil.fillerSuccess("user is added successfully");

		} else {
			response=ResponseContainerutil.fillerFailure("user is already exist ");
		}
		return response;
	}

	@Override
	public Response updateProject(ProjectBean bean) {
		Response response = null;
		try {
			if (bean != null) {
				repository.save(bean);
				response=ResponseContainerutil.fillerSuccess("project updated successfully");
			} else {
				response=ResponseContainerutil.fillerFailure("project data is null already exist");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	} 

	@Override
	public Response getProject(int projectId) {
		Response response = null;

		try {
			if (projectId != 0) {
				response=ResponseContainerutil.fillerSuccess("project created successfully");
				response.setProjectBeans(repository.getAll(projectId));
			} else {
				response=ResponseContainerutil.fillerFailure("project id already exist");
			}

		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}

		return response;

	}

	@Override
	public Response getAllMembers(int groupId) {
		Response response = null;
		try {
			if (repository.findProjectById(groupId) >= 1) {
				List<ProjectBean> projectBean = repository.getAllMembers(groupId);
				response=ResponseContainerutil.fillerSuccess("members found successfully");
				response.setProjectBeans(projectBean);

			} else {
				response=ResponseContainerutil.fillerFailure("members not found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	}

	@Override
	public Response getProjectsByEmail(String email) {
		Response response = null;
		try {
			List<ProjectBean> beans = repository.getAllProjectsByEmaill(email);
			if (!beans.isEmpty() && repository.getProjectsByEmail(email) >= 1) {

				List<Integer> couList = new ArrayList<Integer>();
				for (ProjectBean bean2 : beans) {
					couList.add(repository.getCount(bean2.getProjectPkBean().getProjectId()));
				}
				response=ResponseContainerutil.fillerSuccess("projects found successfully");
				response.setCount(couList);
				response.setProjectBeans(beans);
				response.setProjectBean(repository.getProjectsByEmaill(email));
			} else {
				response=ResponseContainerutil.fillerFailure("projects not found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	}

	@Override
	public Response searchMember(String name, int groupId) {
		Response response = null;
		List<ProjectBean> projectBean = repository.searchMember(name, groupId);
		if (!projectBean.isEmpty()) {
			response=ResponseContainerutil.fillerSuccess("members found successfully");
			response.setProjectBeans(projectBean);
		} else {
			response=ResponseContainerutil.fillerFailure("members not found");
		}
		return response;
	}

	@Override
	public Response getProject(int projectId, String email) {
		Response response = null;
		if (projectId != 0 && !userRepository.getUserBean(email).isEmpty()) {
			response=ResponseContainerutil.fillerSuccess("project created successfully");
			response.setProjectBeans(Arrays.asList(repository.getProjectsByEmaill(email, projectId).get()));
		} else {
			response=ResponseContainerutil.fillerSuccess("project id already exist");
		}

		return response;
	}

	@Override
	public Response removeUserFromProject(int groupId, String newEmail, String removeEmail) {
		Response response = null;
		if (repository.getProjectsByEmaill(removeEmail, groupId).isPresent()
				&& repository.getProjectsByEmaill(newEmail, groupId).isPresent()) {
			int i = repository.updateTask(groupId, newEmail, removeEmail);
			if (i > 0) {
				repository.removeUserFromProject(groupId, removeEmail);
				response=ResponseContainerutil.fillerSuccess("members removed found successfully");
			} else {
				response=ResponseContainerutil.fillerFailure(removeEmail + " has no tasks and cannot be removed ");

			}
		} else {
			response=ResponseContainerutil.fillerFailure(removeEmail + "  not present in the group ");
		}

		return response;
	}

	@Override
	public Response removeUserFromProject(int groupId, String removeEmail) {
		Response response = null;
		if (!repository.getProjectsByEmaill(removeEmail, groupId).isEmpty()) {
			repository.removeUserFromProject(groupId, removeEmail);
			response=ResponseContainerutil.fillerSuccess("members removed  successfully");
		} else {
			response=ResponseContainerutil.fillerFailure("project id or email not exist ");
		}

		return response;
	}

	@Override
	public Response getUserInProject(String email) {
		Response response = null;
		List<Integer> projectId = repository.getUserForSearchForProject(email);
		Set<UserBean> beans = new HashSet<>();
		if (!projectId.isEmpty()) {
			for (Integer i : projectId) {
				beans.addAll(repository.getAllUser(i));
			}
			response=ResponseContainerutil.fillerSuccess("members found  successfully");
			response.setUserBeans(beans);
		} else {
			response=ResponseContainerutil.fillerFailure("no members found  successfully  ");
		}
		return response;
	}
	@Override
	public Response getProjectsWhileCreatingTask(String email, String projectName) {
		Response response = null;
		List<ProjectBean> projectBeans=repository.getProjects(email,projectName);
		System.out.println("projectBean"+projectBeans);
		if(!projectBeans.isEmpty()) {
			response=ResponseContainerutil.fillerSuccess("project found  successfully");
			response.setProjectBean(projectBeans);
		}else {
			response=ResponseContainerutil.fillerFailure("no project found  ");
		}
		return response;
	}

}
