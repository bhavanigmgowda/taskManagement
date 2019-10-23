package com.taskmanagement.dto;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.Data;

@SuppressWarnings("serial")
@Entity
@JsonRootName("project")
@Table(name = "project")
@Data
public class ProjectBean implements Serializable {

	@EmbeddedId
	@Column(name="projectId")
	private  ProjectPKBean projectPkBean;
	
	@Column(name = "project_name")
	private String projectName;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "created_Date")
	@CreationTimestamp
	private LocalDate createdDate;
	
	@Column(name = "deadline")
	private LocalDate deadline;
	
	@JoinColumn(name = "taskid")
	@ManyToOne(cascade = CascadeType.ALL)
	private CreateTaskBean createTaskBean;
}
