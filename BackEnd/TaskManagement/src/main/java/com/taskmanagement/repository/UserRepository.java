package com.taskmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanagement.dto.UserBean;

public interface UserRepository extends JpaRepository<UserBean, Integer> {

	Optional<UserBean> findByEmail(String email);

	boolean existsByEmail(String email);
	
}//end of interface