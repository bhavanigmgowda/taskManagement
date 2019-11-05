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

import com.fasterxml.jackson.annotation.JsonRootName;

@SuppressWarnings("serial")
@Entity
@Table(name = "comment")
@JsonRootName("Comment")
public class CommentBean implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "comment_id")
	private Integer commentId;
	
	@Column(name = "comment")
	private String comment;

	@JoinColumn(name = "task_id")
	@ManyToOne(cascade = CascadeType.MERGE)
	private CreateTaskBean taskBean;

	@JoinColumn(name = "emp_id")
	@ManyToOne(cascade = CascadeType.MERGE)
	private UserBean userBean;

	public Integer getCommentId() {
		return commentId;
	}

	public void setCommentId(Integer commentId) {
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

	@Override
	public String toString() {
		return "CommentBean [commentId=" + commentId + ", comment=" + comment + ", taskBean=" + taskBean + ", userBean="
				+ userBean + "]";
	}

}
