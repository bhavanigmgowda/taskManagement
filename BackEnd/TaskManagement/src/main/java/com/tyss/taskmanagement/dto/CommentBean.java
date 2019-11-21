package com.tyss.taskmanagement.dto;

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

import lombok.Data;

@SuppressWarnings("serial")
@Entity
@Table(name = "comment_info")
@JsonRootName("Comment")
@Data
public class CommentBean implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "comment_id")
	private Integer commentId;
	
	@Column(name = "comment")
	private String comment;

	@JoinColumn(name = "task_id")
	@ManyToOne(cascade = CascadeType.MERGE)
	private TaskBean taskBean;

	@JoinColumn(name = "emp_id")
	@ManyToOne(cascade = CascadeType.MERGE)
	private UserBean userBean;

}
