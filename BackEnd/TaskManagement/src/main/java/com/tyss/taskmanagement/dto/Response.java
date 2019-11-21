package com.tyss.taskmanagement.dto;

/**
 * @role response bean for sending response object 
 */
import java.util.List;
import java.util.Set;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Response {

	private int statusCode;
	private List<Integer> count;

	private String message;

	private String description;

	private List<UserBean> userBean;

	private List<TaskBean> taskBean;

	private Set<TaskBean> end;

	private Set<UserBean> userBeans;

	private List<CommentBean> commentBean;

	private List<ProjectBean> projectBeans;

	private List<ProjectBean> projectBean;

	private List<String> endDate;

	private List<String> emailList;

	private UserBean bean;

}
