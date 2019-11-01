package com.taskmanagement.dto;


/**
 * @role UserBean class containing data fields ,getters, setters ,default constructor... 
 */

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.Data;

@Data
@Entity
@Table(name = "user")
@SuppressWarnings(value = { "serial" })
@JsonRootName(value = "User")
@JsonIgnoreProperties(value = {"password"}, allowSetters = true)
public class UserBean implements Serializable {

	@GeneratedValue
	@Id
	@Column(name = "emp_id")
	private Integer employeeId;
	@Column(name = "emp_name")
	private String employeeName;
	@Column(name = "email", unique = true)
	private String email;
	@Column(name = "password")
	private String password;
	@Column(name = "designation")
	private String designation;
	@Column(name = "role")
	private String role;
	public Integer getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "UserBean [employeeId=" + employeeId + ", employeeName=" + employeeName + ", email=" + email
				+ ", password=" + password + ", designation=" + designation + ", role=" + role + "]";
	}
	
	

}
