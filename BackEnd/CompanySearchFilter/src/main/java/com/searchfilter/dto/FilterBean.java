package com.searchfilter.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "filter")
public class FilterBean implements Serializable {
	
	private static final long serialVersionUID = 1L;
	@Id
	private Integer id;
	@Column(name = "company-name")
	private String companyName;

	private String designation;

	private String skills;

	private String experience;

}
