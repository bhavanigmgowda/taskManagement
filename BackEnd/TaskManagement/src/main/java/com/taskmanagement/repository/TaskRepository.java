package com.taskmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.taskmanagement.dto.CreateTaskBean;

public interface TaskRepository extends JpaRepository<CreateTaskBean, Integer> {

	@Query("Select t from CreateTaskBean t where t.priority LIKE :name%")
	List<CreateTaskBean> getTaskByPriority(String name);

	@Query("Select  count(*) from CreateTaskBean t where t.priority LIKE :name%")
	int countTask(String name);

	@Query("Select t from CreateTaskBean t where t.userBean.email=:email")
	List<CreateTaskBean> getAssignTo(String email);

	@Query("Select t from CreateTaskBean t where t.assignedTo=:email")
	List<CreateTaskBean> getAssignedTask(String email);

	@Query("Select t from CreateTaskBean t where t.subject LIKE :subject%")
	List<CreateTaskBean> getTaskBySubject(String subject);
	
	@Query("Select  count(*) from CreateTaskBean t where t.subject LIKE :name%")
	int countSubject(String name);
	
	@Query("SELECT t FROM CreateTaskBean t WHERE " 
			+ "LOWER(t.description) LIKE LOWER(CONCAT('%',:searchTerm, '%')) AND" + "(t.userBean.email=:email)")
	List<CreateTaskBean> findBySearchTerm(@Param("searchTerm") String searchTerm, @Param("email") String email);

}
