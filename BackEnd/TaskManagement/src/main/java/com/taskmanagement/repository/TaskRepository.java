package com.taskmanagement.repository;

import java.util.List;
import java.util.TreeSet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.taskmanagement.dto.CreateTaskBean;

public interface TaskRepository extends JpaRepository<CreateTaskBean, Integer> {

	@Query("Select t from CreateTaskBean t where t.priority LIKE :name%")
	List<CreateTaskBean> getTaskByPriority(String name);

	@Query("Select  count(*) from CreateTaskBean t where t.priority LIKE %:name%")
	int countTask(String name);

	@Query("Select t from CreateTaskBean t where t.userBean.email=:email")
	List<CreateTaskBean> getAssignTo(String email);

	@Query("Select t from CreateTaskBean t where t.assignedTo=:email")
	List<CreateTaskBean> getAssignedTask(String email);

	@Query("Select t from CreateTaskBean t where t.subject LIKE :subject%")
	List<CreateTaskBean> getTaskBySubject(String subject);

	@Query("Select  count(*) from CreateTaskBean t where t.subject LIKE :name%")
	int countSubject(String name);

	
	@Query("SELECT t FROM CreateTaskBean t WHERE " + "LOWER(t.description) LIKE LOWER(CONCAT('%',:searchTerm, '%')) AND"
			+ "(t.userBean.email=:email)")
	List<CreateTaskBean> findBySearchTerm(@Param("searchTerm") String searchTerm, @Param("email") String email);

	@Query("select t from CreateTaskBean t where "
			+ " t.status='completed' and t.userBean.email=:email and t.completed=:completed")
	List<CreateTaskBean> findCompletedTask(String email, String completed);

	@Query("select t from CreateTaskBean t where "
			+ " t.status='completed' and t.userBean.email=:email and t.completed=:completed")
	List<CreateTaskBean> findCompletedTaskBySet(String email, String completed);

	@Query("select t from CreateTaskBean t where " + " t.status='completed' and t.assignedTo=:email and t.completed!=null")
	List<CreateTaskBean> findCompletedByMe(String email);

	@Query("select  t.completed " + " from CreateTaskBean t where " + "t.status='completed' and t.assignedTo=:email and  t.completed>=:from" )
	List<String> findEndDateByMe(String email,String from);
	
	@Query("select t from CreateTaskBean t where " + " t.status='completed' and t.userBean.email=:email and t.completed!=null")
	List<CreateTaskBean> findCompletedToMe(String email);

	@Query("select  t.completed " + " from CreateTaskBean t where " + "t.status='completed' and t.userBean.email=:email and t.completed>=:from" )
	List<String> findEndDateToMe(String email,String from);

	@Query("select  t " + " from CreateTaskBean t where "
			+ " t.status='completed' and t.assignedTo=:email and t.completed between concat(:from ,'%') and concat(:to ,'%') ")
	TreeSet<CreateTaskBean> fromTo(String email, String from, String to);

	@Query(value = "select t from CreateTaskBean t where t.userBean.email=:email and (t.subject LIKE %:searchTerm% or"
			+ " t.description LIKE %:searchTerm% ) ")
	List<CreateTaskBean> findByMe(@Param("searchTerm") String searchTerm, @Param("email") String email);

	@Query(value = "select t from CreateTaskBean t where t.assignedTo=:email and (t.subject LIKE %:searchTerm% or"
			+ " t.description LIKE %:searchTerm% )")
	List<CreateTaskBean> findToMe(@Param("searchTerm") String searchTerm, @Param("email") String email);

	@Query("Select  count(*) from CreateTaskBean t where t.description LIKE %:name%")
	int countDescription(String name);

}
