package com.tyss.taskmanagement.repository;

import java.util.List;

/**
 *@role UserRepository interface for performing CRUD operation on UserBean 
 */

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tyss.taskmanagement.dto.UserBean;

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
	
	@Query(value = "select u from UserBean u where u.email=:email ")
	Optional<UserBean> getUserBean(String email);

	@Query(value = "select u from UserBean u where u.employeeName LIKE :name%")
	List<UserBean> getUser(String name);
	
	@Query(value = "select email from user where email like :email%",nativeQuery = true)
	List<String> getEmailsWhileSearch(String email);
	
	@Query(value = "select email from user where email like :email% and emp_id in(select emp_id from project_info where project_Id=:projectId)",nativeQuery = true)
	List<String> getEmailsWhileCreatingTask(String email, int projectId);
}// end of interface