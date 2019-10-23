package com.taskmanagement.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Embeddable
@SuppressWarnings("serial")
public class ProjectPKBean implements Serializable {
	@Column(name = "group_id")
	private int groupId;

	
	@JoinColumn(name = "emp_id")
	@ManyToOne
	private UserBean userBean;

}
