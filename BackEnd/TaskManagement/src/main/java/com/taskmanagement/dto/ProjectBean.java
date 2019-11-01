package com.taskmanagement.dto;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
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
	@Column(name="project_id")
	private  ProjectPKBean projectPkBean;
	
	@Column(name = "project_name")
	private String projectName;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "created_Date")
	@CreationTimestamp
	private LocalDate createdDate;
	
	@Column(name = "deadline")
	private String deadline;
	

	public ProjectPKBean getProjectPkBean() {
		return projectPkBean;
	}

	public void setProjectPkBean(ProjectPKBean projectPkBean) {
		this.projectPkBean = projectPkBean;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDate createdDate) {
		this.createdDate = createdDate;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	@Override
	public String toString() {
		return "ProjectBean [projectPkBean=" + projectPkBean + ", projectName=" + projectName + ", description="
				+ description + ", createdDate=" + createdDate + ", deadline=" + deadline + "]";
	}

	
	
}
