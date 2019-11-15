package com.taskmanagement.dto;

/**
 * @role response bean for sending response object 
 */
import java.util.List;
import java.util.Set;

import lombok.Data;

@Data
public class Response {

	private int statusCode;
	private List<Integer> count;

	private String message;

	private String description;

	private List<UserBean> userBean;

	private List<CreateTaskBean> taskBean;
	
	private Set<CreateTaskBean> end;
	
	private Set<UserBean> userBeans;
	
	private List<CommentBean> commentBean;

	private List<ProjectBean> projectBeans ;
	

	private List<ProjectBean> projectBean ;
	
	private List<String> EndDate;
	
	private List<String> EmailList;
	
 
	private UserBean bean;
	
	
	
	public List<String> getEmailList() {
		return EmailList;
	}

	public void setEmailList(List<String> emailList) {
		EmailList = emailList;
	}





	public List<ProjectBean> getProjectBean() {
		return projectBean;
	}





	public Set<UserBean> getUserBeans() {
		return userBeans;
	}





	public List<Integer> getCount() {
		return count;
	}





	public void setCount(List<Integer> count) {
		this.count = count;
	}





	public void setUserBeans(Set<UserBean> userBeans) {
		this.userBeans = userBeans;
	}





	public void setProjectBean(List<ProjectBean> projectBean) {
		this.projectBean = projectBean;
	}





	public UserBean getBean() {
		return bean;
	}





	public void setBean(UserBean bean) {
		this.bean = bean;
	}





	public int getStatusCode() {
		return statusCode;
	}

	
	


	public List<String> getEndDate() {
		return EndDate;
	}





	public void setEndDate(List<String> endDate) {
		EndDate = endDate;
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

	public Set<CreateTaskBean> getEnd() {
		return end;
	}

	public void setEnd(Set<CreateTaskBean> end) {
		this.end = end;
	}

	public List<CommentBean> getCommentBean() {
		return commentBean;
	}

	public void setCommentBean(List<CommentBean> commentBean) {
		this.commentBean = commentBean;
	}
	
	
	
}

