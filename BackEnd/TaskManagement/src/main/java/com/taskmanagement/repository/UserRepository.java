package com.taskmanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.taskmanagement.dto.UserBean;

public interface UserRepository extends JpaRepository<UserBean, Integer> {

	Optional<UserBean> findByEmail(String email);

	boolean existsByEmail(String email);

	@Query("select e from UserBean e where e.employeeName LIKE %:name% ")
	List<UserBean> findByEmployeeName(String name);

	@Query("select count(*) from UserBean e where e.employeeName LIKE %:name% ")
	int existsByEmployeeName(String name);
	

}
