package com.taskmanagement.response;

import java.util.List;

import com.taskmanagement.dto.CreateTaskBean;
import com.taskmanagement.dto.UserBean;

import lombok.Data;


public class Response {

	public int getStatusCode() {
		return statusCode;
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

	private int statusCode;

	private String message;

	private String description;

	private List<UserBean> userBean;

	private List<CreateTaskBean> taskBean;
}
