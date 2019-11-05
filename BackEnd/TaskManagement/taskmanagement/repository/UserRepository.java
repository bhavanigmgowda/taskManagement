package com.taskmanagement.repository;

import java.util.ArrayList;
import java.util.List;

/**
 *@role UserRepository interface for performing CRUD operation on UserBean 
 */

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.taskmanagement.dto.CreateTaskBean;
import com.taskmanagement.dto.UserBean;

public interface UserRepository extends JpaRepository<UserBean, Integer> {

	/**
	 * @role abstract method to find email
	 * @param email :takes email value
	 * @return userBean object
	 */
	Optional<UserBean> findByEmail(String email);

	/**
	 * @role abstract method to check whether email exist or not
	 * @param email :takes email value 
	 * @return boolean value
	 */
	boolean existsByEmail(String email);
	
	/*
	 * @Query(value = "select t from CreateTaskBean where t.taskId=:projectId ")
	 * CreateTaskBean findTask(@Param("projectId") String projectId);
	 */
	
	@Query(value="select u from UserBean u where u.email=:email ")
	Optional<UserBean> getId(String email);
	
	@Query(value="select u from UserBean u where u.employeeName LIKE :name%")
	List<UserBean> getUser(String name);
}//end of interface