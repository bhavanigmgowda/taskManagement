package com.taskmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagement.dto.CommentBean;
import com.taskmanagement.dto.Response;
import com.taskmanagement.service.CommentService;
@CrossOrigin(origins = "*")

@RestController
public class CommentController {

	@Autowired
	CommentService service;
	
	@PostMapping(value = "/add-comment",produces = MediaType.APPLICATION_JSON_VALUE )
	public Response addComment(@RequestParam("bean") CommentBean bean) {
		return service.addComment(bean);
	}
	
	@PostMapping(value = "/update-comment",produces = MediaType.APPLICATION_JSON_VALUE )
	public Response updateComment(@RequestParam("bean") CommentBean bean) {
		return service.updateComment(bean);
	}
	
	@PostMapping(value = "/delete-comment",produces = MediaType.APPLICATION_JSON_VALUE )
	public Response removeComment(@RequestParam("commentId") int commentId) {
		return service.removeComment(commentId);
	}
	
}
