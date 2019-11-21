package com.tyss.taskmanagement.dto;

/**
 * @role TaskBean class containing data fields ,getters, setters ,default constructor... 
 */


import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.Data;


@Entity
@Table(name = "task_info")
@JsonRootName("Assign-Task")
@SuppressWarnings(value = { "serial" })
@Data
public class TaskBean implements Serializable,Comparable<TaskBean> {

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
	
	@ManyToOne
    @JoinColumns({
        @JoinColumn(
            name = "project_id",
            referencedColumnName = "project_id" , insertable = true, updatable = true),
        @JoinColumn(
            name = "e_id",
            referencedColumnName = "emp_id", insertable = true, updatable = true)
    })
    
    private ProjectBean projectBean;

	@Override
	public int compareTo(TaskBean o) {
		return this.completed.compareTo(o.completed);
	}
	
}
