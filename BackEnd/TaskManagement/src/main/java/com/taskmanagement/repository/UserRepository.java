package com.taskmanagement.repository;

/**
 *@role UserRepository interface for performing CRUD operation on UserBean 
 */

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

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
	
}//end of interface