package com.searchfilter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.searchfilter.dto.FilterBean;

public interface FilterRepository extends JpaRepository<FilterBean, Integer> {

	@Query("select f from FilterBean f where (f.companyName like %:cname%) and (f.designation like %:desc%) "
			+ "and (f.skills like %:skill%) and (f.experience like %:experience%)")

	List<FilterBean> findAll(@Param("cname") String cname, @Param("desc") String desc,
			@Param("skill") String skill, @Param("experience") String experience);
}
