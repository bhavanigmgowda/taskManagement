package com.searchfilter.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@JsonRootName("filters")
@Table(name = "filter")
public class FilterBean implements Serializable {
	
	@Id
	@Column(name = "id")
	private int id;
	@Column(name = "company_name")
	private String companyName;
	@Column(name = "designation")
	private String designation;
	@Column(name = "skills")
	private String skills;
	@Column(name = "experience")
	private String experience;

}
