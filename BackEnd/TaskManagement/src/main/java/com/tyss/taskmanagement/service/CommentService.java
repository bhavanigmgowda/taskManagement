package com.tyss.taskmanagement.service;

import com.tyss.taskmanagement.dto.CommentBean;
import com.tyss.taskmanagement.dto.Response;

public interface CommentService {

	public Response addComment(CommentBean bean);

	public Response removeComment(int commentId);

	public Response updateComment(CommentBean bean);

	public Response getComment(int commentId);

	public Response getAllComment(int taskId);
}