package com.taskmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagement.dto.CommentBean;
import com.taskmanagement.dto.Response;
import com.taskmanagement.service.CommentService;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CommentController {

	@Autowired
	CommentService service;
	
	@PostMapping(value = "/add-comment",produces = MediaType.APPLICATION_JSON_VALUE )
	public Response addComment(@RequestBody CommentBean bean) {
		return service.addComment(bean);
	}
	
	@PutMapping(value = "/update-comment",produces = MediaType.APPLICATION_JSON_VALUE )
	public Response updateComment(@RequestBody CommentBean commentBean) {
		return service.updateComment(commentBean);
	}
	
	@PostMapping(value = "/delete-comment",produces = MediaType.APPLICATION_JSON_VALUE )
	public Response removeComment(@RequestParam("commentId") int commentId) {
		return service.removeComment(commentId);
	}
	
	@GetMapping(value = "/get-comment",produces = MediaType.APPLICATION_JSON_VALUE )
	public Response getComment() {
		return service.getComment();
	}
	
}
