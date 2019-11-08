package com.taskmanagement.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanagement.dto.CommentBean;
import com.taskmanagement.dto.Response;
import com.taskmanagement.repository.CommentRepository;
import com.taskmanagement.repository.TaskRepository;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	TaskRepository taskRepository;

	@Override
	public Response addComment(CommentBean bean) {
		Response response = new Response();
		try {
			if (bean != null && taskRepository.existsById(bean.getTaskBean().getTaskId())) {
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("comment added successfully");
				commentRepository.save(bean);
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("task id not found");
			}
		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

	@Override
	public Response updateComment(CommentBean bean) {
		Response response = new Response();
		try {
			if (commentRepository.existsById(bean.getCommentId())) {

				CommentBean commentBean = commentRepository.findById(bean.getCommentId()).get();

				if (commentBean.getComment().trim() != "") {
					commentBean.setComment(bean.getComment());
					commentRepository.save(bean);
					response.setStatusCode(201);
					response.setMessage("Success");
					response.setDescription("Comment updated successfully");
				} else {
					response.setStatusCode(401);
					response.setMessage("Failure");
					response.setDescription("comment was not updated");
				}
			} else {
				response.setStatusCode(402);
				response.setMessage("Failure");
				response.setDescription("comment id doesnt exists ");
			}
		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

	@Override
	public Response removeComment(int commentId) {
		Response response = new Response();
		try {
			if (commentRepository.existsById(commentId)) {

				commentRepository.deleteById(commentId);
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("comment Deleted successfully");
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("comment id doesn't exist ");
			}
		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;

	}

	@Override
	public Response getComment(int commentId) {
		Response response = new Response();
		try {
			if (commentRepository.existsById(commentId)) {

				List<CommentBean> commentBeans = Arrays.asList(commentRepository.findById(commentId).get());
				response.setStatusCode(201);
				response.setCommentBean(commentBeans);
				response.setMessage("Success");
				response.setDescription("comment retrieved successfully");
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("comment id doesn't exist ");
			}
		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;

	}

	@Override
	public Response getAllComment(int taskId) {
		Response response = new Response();
		try {
			if (taskId != 0 && taskRepository.existsById(taskId)) {
				response.setCommentBean(commentRepository.getCommentBasedOnTaskId(taskId));
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("All Comments for respective task ID Found Successfully");
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("task id doesn't exist ");
			}
		} catch (Exception e) {
			response.setDescription("Exception occured :-" + e.getMessage());
			response.setMessage("Exception");
			response.setStatusCode(501);
		}
		return response;
	}

}
