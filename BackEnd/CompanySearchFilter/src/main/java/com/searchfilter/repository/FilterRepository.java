package com.searchfilter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.searchfilter.dto.FilterBean;

public interface FilterRepository extends JpaRepository<FilterBean, Integer> {

//	@Query("select f from FilterBean f where (f.companyName like %:cname%) and (f.designation like %:desc%) "
//			+ "and (f.skills like %:skill%) and (f.experience like %:experience%)")

//	@Query(value = "select * from filter f where  ((f.company_name =:cname )  or  ( f.company_name like %:cname% )) and ( f.designation like %:desc or  f.designation = :desc)"
//			+ "and ( f.skills like %:skill or  f.skills = :skill) and ( f.experience like %:experience or  f.experience = :experience)", nativeQuery = true)

	
//@Query(value = "select * from filter f where (LENGTH(f.company_name)>\"0\" and f.company_name like '%:cname%' )  or  ((LENGTH(f.company_name)!=\"0\" and f.company_name like '%:cname%' ))", nativeQuery = true)
	
@Query(value = "SELECT * FROM filter WHERE ( (LENGTH(:cname)=0 AND company_name LIKE \"%\"  ) OR ((LENGTH(:cname)>0 AND company_name LIKE (:cname)))) AND ((LENGTH(:desc)=0 AND designation LIKE \"%\" ) OR (LENGTH(:desc)>0 AND designation LIKE (:desc))) AND (((LENGTH(:experiences)=0 AND experience LIKE \"%\" ) OR (LENGTH(:experiences)>0 AND experience LIKE (:experiences)))) AND ((LENGTH(:skill)=0 AND skills LIKE \"%\" ) OR (LENGTH(:skill)>0 AND skills LIKE (:skill))) ",nativeQuery = true)
	List<FilterBean> findAll(@Param("cname") String cname,@Param("desc") String desc,@Param("experiences") String experience,@Param("skill") String skill);
	
//	List<FilterBean> findAll(@Param("cname") String cname, @Param("desc") String desc, @Param("skill") String skill,
//			@Param("experience") String experience);
}
