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
	
}

