package com.taskmanagement.dto;

/**
 * @role response bean for sending response object 
 */
import java.util.List;
import java.util.TreeSet;

import lombok.Data;

@Data
public class Response {

	private int statusCode;

	private String message;

	private String description;

	private List<UserBean> userBean;

	private List<CreateTaskBean> taskBean;
	
	private TreeSet<CreateTaskBean> end;
	
	private List<CommentBean> commentBean;

	private List<ProjectBean> projectBeans ;

	public int getStatusCode() {
		return statusCode;
	}

	
	public List<ProjectBean> getProjectBeans() {
		return projectBeans;
	}


	public void setProjectBeans(List<ProjectBean> projectBeans) {
		this.projectBeans = projectBeans;
	}


	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<UserBean> getUserBean() {
		return userBean;
	}

	public void setUserBean(List<UserBean> userBean) {
		this.userBean = userBean;
	}

	public List<CreateTaskBean> getTaskBean() {
		return taskBean;
	}

	public void setTaskBean(List<CreateTaskBean> taskBean) {
		this.taskBean = taskBean;
	}

	public TreeSet<CreateTaskBean> getEnd() {
		return end;
	}

	public void setEnd(TreeSet<CreateTaskBean> end) {
		this.end = end;
	}

	public List<CommentBean> getCommentBean() {
		return commentBean;
	}

	public void setCommentBean(List<CommentBean> commentBean) {
		this.commentBean = commentBean;
	}
	
	
	
}

