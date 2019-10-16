package com.searchfilter.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "filter")
public class FilterBean implements Serializable {
	
	@Id
	@Column(name = "id")
	private int id;
	@Column(name = "company_name")
	private String companyName;
	@Column(name = "desgination")
	private String designation;
	@Column(name = "skills")
	private String skills;
	@Column(name = "experience")
	private String experience;

}
