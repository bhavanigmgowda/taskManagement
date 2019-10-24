package com.taskmanagement.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanagement.dto.CommentBean;

public interface CommentRepository extends JpaRepository<CommentBean, Integer> {
	
}
