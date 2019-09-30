package com.taskmanagement.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

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
	private Date completed;
	@ManyToOne
	@JoinColumn(name = "emp_id")
	private UserBean userBean;
	
	@Override
	public int compareTo(CreateTaskBean o) {
		return this.completed.compareTo(o.completed);
	}
}
