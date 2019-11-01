package com.taskmanagement.dto;

/**
 * @role TaskBean class containing data fields ,getters, setters ,default constructor... 
 */


import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.Data;

@Data
@Entity
@Table(name = "assign_task")
@JsonRootName("Assign-Task")
@SuppressWarnings(value = { "serial" })
public class CreateTaskBean implements Serializable,Comparable<CreateTaskBean> {

	@Id
	@Column(name = "task_id")
	@GeneratedValue
	private Integer taskId;
	@Column(name = "description")
	private String description;
	@Column(name = "subject")
	private String subject;
	@Column(name = "end_date")
	private LocalDate endDate;
	@Column(name = "priority")
	private String priority;
	@Column(name = "assign_date")
	@CreationTimestamp
	private LocalDate assignDate;
	@Column(name = "assigned_to")
	private String assignedTo;
	@Column(name = "status")
	private String status;
	@Column(name = "completed")
	private String completed;
	
	@ManyToOne
	@JoinColumn(name = "emp_id")
	private UserBean userBean;
	
	@NotFound(action = NotFoundAction.IGNORE)
    @ManyToOne
    @JoinColumns({
        @JoinColumn(
            name = "project_id",
            referencedColumnName = "project_id"),
        @JoinColumn(
            name = "e_id",
            referencedColumnName = "emp_id")
    })
    private ProjectBean projectBean;
	
	public Integer getTaskId() {
		return taskId;
	}


	public void setTaskId(Integer taskId) {
		this.taskId = taskId;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getSubject() {
		return subject;
	}


	public void setSubject(String subject) {
		this.subject = subject;
	}


	public LocalDate getEndDate() {
		return endDate;
	}


	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}


	public String getPriority() {
		return priority;
	}


	public void setPriority(String priority) {
		this.priority = priority;
	}


	public LocalDate getAssignDate() {
		return assignDate;
	}


	public void setAssignDate(LocalDate assignDate) {
		this.assignDate = assignDate;
	}


	public String getAssignedTo() {
		return assignedTo;
	}


	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getCompleted() {
		return completed;
	}


	public void setCompleted(String completed) {
		this.completed = completed;
	}


	public UserBean getUserBean() {
		return userBean;
	}


	public void setUserBean(UserBean userBean) {
		this.userBean = userBean;
	}


	@Override
	public int compareTo(CreateTaskBean o) {
		return this.completed.compareTo(o.completed);
	}
}
