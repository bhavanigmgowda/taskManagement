package com.taskmanagement.service;

import com.taskmanagement.dto.CommentBean;
import com.taskmanagement.dto.Response;

public interface CommentService {

	public Response addComment(CommentBean bean);
	
	public Response removeComment(int commentId);
	
	public Response updateComment(CommentBean bean);
	
}
