package com.taskmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.taskmanagement.dto.CommentBean;

public interface CommentRepository extends JpaRepository<CommentBean, Integer> {

	@Query("select c from CommentBean c where c.userBean.employeeId=:userId")
	boolean findUserById(@Param("userId") int userId);
	
}
