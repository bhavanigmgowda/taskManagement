package com.taskmanagement.dto;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.Data;

@SuppressWarnings("serial")
@Entity
@Table(name = "comment")
@JsonRootName("Comment")
@Data
public class CommentBean implements Serializable {

	@Id
	@GeneratedValue
	@JsonProperty(value = "commentId")
	@Column(name = "comment_id")
	private int commentId;
	@Column(name = "comment")
	private String comment;
	
	
	
	@JoinColumn(name = "task_id")
	@ManyToOne(cascade = CascadeType.ALL)
	private CreateTaskBean taskBean;
	
	@JoinColumn(name = "emp_id")
	@ManyToOne(cascade = CascadeType.ALL)
	private UserBean userBean;

	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public CreateTaskBean getTaskBean() {
		return taskBean;
	}

	public void setTaskBean(CreateTaskBean taskBean) {
		this.taskBean = taskBean;
	}

	public UserBean getUserBean() {
		return userBean;
	}

	public void setUserBean(UserBean userBean) {
		this.userBean = userBean;
	}
	
	
	
}
