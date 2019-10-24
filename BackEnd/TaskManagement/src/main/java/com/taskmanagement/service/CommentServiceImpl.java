package com.taskmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanagement.dto.CommentBean;
import com.taskmanagement.dto.Response;
import com.taskmanagement.repository.CommentRepository;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	CommentRepository commentRepository;

	@Override
	public Response addComment(CommentBean bean) {
		Response response = new Response();
		try {
			if (commentRepository.findUserById(bean.getUserBean().getEmployeeId())) {

				commentRepository.save(bean);
				response.setStatusCode(201);
				response.setMessage("Success");
				response.setDescription("comment added successfully");
			} else {
				response.setStatusCode(401);
				response.setMessage("Failure");
				response.setDescription("user id already exist ");
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
		}
		catch (Exception e) {
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
}
