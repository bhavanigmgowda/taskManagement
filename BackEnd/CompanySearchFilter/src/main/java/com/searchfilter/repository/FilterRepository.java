package com.searchfilter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.searchfilter.dto.FilterBean;

public interface FilterRepository extends JpaRepository<FilterBean, Integer> {

	@Query("select t from FilterBean f where (f.companyName like %:checkOne%) and (f.designation like %:checkTwo%) and (f.skills like %:checkThree%) and (f.experience like %:checkFour%)")

	List<FilterBean> findAll(@Param("checkOne") String checkOne, @Param("checkTwo") String checkTwo,
			@Param("checkThree") String checkThree, @Param("checkFour") String checkFour);}
