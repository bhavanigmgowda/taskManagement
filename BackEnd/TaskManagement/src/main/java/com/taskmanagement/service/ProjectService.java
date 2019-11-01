package com.taskmanagement.service;

import com.taskmanagement.dto.ProjectBean;
import com.taskmanagement.dto.Response;

public interface ProjectService {
	public Response createProject(ProjectBean bean,int count) ;
	public Response updateProject(ProjectBean bean);
	public Response getProject(int projectId);
    public Response getAllMembers(int groupId);
    public Response getProjectsByEmail( String email);
    public Response searchMember(String name, int groupId);

    public Response addMemeber(String name, int groupId, String email);

    public Response removeUserFromProject(int groupId,String newEmail, String removeEmail);

	
}
