package com.tyss.taskmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tyss.taskmanagement.dto.CommentBean;

public interface CommentRepository extends JpaRepository<CommentBean, Integer> {

	@Query("select c from CommentBean c where  c.taskBean.taskId=:tId")
	List<CommentBean> getCommentBasedOnTaskId(int tId);
	

}