package com.tyss.taskmanagement.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tyss.taskmanagement.dto.CommentBean;
import com.tyss.taskmanagement.dto.Response;
import com.tyss.taskmanagement.repository.CommentRepository;
import com.tyss.taskmanagement.repository.TaskRepository;
import com.tyss.taskmanagement.util.ResponseContainerutil;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	TaskRepository taskRepository;

	@Override
	public Response addComment(CommentBean bean) {
		Response response = null;
		try {
			if (bean != null && taskRepository.existsById(bean.getTaskBean().getTaskId())) {
				
				response=ResponseContainerutil.fillerSuccess("Comment added successfully");
				commentRepository.save(bean);
			} else {
				response=ResponseContainerutil.fillerFailure("task id not found");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	}

	@Override
	public Response updateComment(CommentBean bean) {
		Response response = null;
		try {
			if (commentRepository.existsById(bean.getCommentId())) {

				CommentBean commentBean = commentRepository.findById(bean.getCommentId()).get();
				if (commentBean.getComment().trim() != "") {
					commentBean.setComment(bean.getComment());
					commentRepository.save(bean);
					response=ResponseContainerutil.fillerSuccess("Comment updated successfully");
				} else {
					response=ResponseContainerutil.fillerFailure("comment was not updated");
				}
			} else {
				response=ResponseContainerutil.fillerException("comment id doesnt exists");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	}

	@Override
	public Response removeComment(int commentId) {
		Response response = null;
		try {
			if (commentRepository.existsById(commentId)) {
				commentRepository.deleteById(commentId);
				response=ResponseContainerutil.fillerSuccess("comment Deleted successfully");

			} else {
				response=ResponseContainerutil.fillerFailure("comment id doesn't exist ");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;

	}

	@Override
	public Response getComment(int commentId) {
		Response response = null;
		try {
			if (commentRepository.existsById(commentId)) {

				List<CommentBean> commentBeans = Arrays.asList(commentRepository.findById(commentId).get());
				response=ResponseContainerutil.fillerSuccess("comment retrieved successfully");
				response.setCommentBean(commentBeans);
			} else {
				
				response=ResponseContainerutil.fillerFailure("comment id doesn't exist");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	}
	@Override
	public Response getAllComment(int taskId) {
		Response response = null;
		try {
			if (taskId != 0 && taskRepository.existsById(taskId)) {
				response=ResponseContainerutil.fillerSuccess("All Comments for respective task ID Found Successfully");
				response.setCommentBean(commentRepository.getCommentBasedOnTaskId(taskId));
			} else {
				response=ResponseContainerutil.fillerFailure("task id doesn't exist");
			}
		} catch (Exception e) {
			response=ResponseContainerutil.fillerException("Exception occured :-" + e.getMessage());
		}
		return response;
	}

}
