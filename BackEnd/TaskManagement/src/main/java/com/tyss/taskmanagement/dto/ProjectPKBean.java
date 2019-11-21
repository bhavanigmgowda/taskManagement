package com.tyss.taskmanagement.dto;

import java.io.Serializable;
import java.util.concurrent.atomic.AtomicInteger;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Embeddable
@SuppressWarnings("serial")
public class ProjectPKBean implements Serializable {
	
	public static final AtomicInteger count = new AtomicInteger(0);

	
	@GeneratedValue
	@Column(name = "project_id")
	private int projectId;

	
	@JoinColumn(name = "emp_id")
	@ManyToOne
	private UserBean userBean;

}
