package com.taskmanagement.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Embeddable
@SuppressWarnings("serial")
public class ProjectPKBean implements Serializable {
	
	@GeneratedValue
	@Column(name = "project_id")
	private int groupId;

	
	@JoinColumn(name = "emp_id")
	@ManyToOne
	private UserBean userBean;


	public int getGroupId() {
		return groupId;
	}


	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}


	public UserBean getUserBean() {
		return userBean;
	}


	public void setUserBean(UserBean userBean) {
		this.userBean = userBean;
	}

}
