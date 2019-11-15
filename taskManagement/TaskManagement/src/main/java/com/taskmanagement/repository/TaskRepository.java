package com.taskmanagement.repository;

/**
 * TaskRepository interface for performing CRUD operation on UserBean 
 */

import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.taskmanagement.dto.CreateTaskBean;

public interface TaskRepository extends JpaRepository<CreateTaskBean, Integer> {

	/**
	 * @role abstract method for retrieving task assigned to user email
	 * @param email: takes email value from request
	 * @return list of TaskBean object
	 */
	@Query("Select t from CreateTaskBean t where t.userBean.email=:email ")
	List<CreateTaskBean> getAssignTo(String email);

	/**
	 * @role abstract method for retrieving assigned task
	 * @param email: takes email value of user
	 * @return list of CreateTaskBean object
	 */
	@Query("Select t from CreateTaskBean t where t.assignedTo=:email ")
	List<CreateTaskBean> getAssignedTask(String email);

	/**
	 * @role abstract method for retrieving completed tasks
	 * @param email:     takes email value
	 * @param completed: takes completed value
	 * @return list of CreateTaskBean object
	 */
	@Query("select t from CreateTaskBean t where "
			+ " t.status='completed' and t.userBean.email=:email and t.completed=:completed")
	List<CreateTaskBean> findCompletedTask(String email, String completed);

	/**
	 * @role abstract method for retrieving completed task set by user
	 * @param email:      takes email value
	 * @param completed:: takes completed value
	 * @return list of CreateTaskBean object
	 */
	@Query("select t from CreateTaskBean t where "
			+ " t.status='completed' and t.assignedTo=:email and t.completed=:completed")
	Set<CreateTaskBean> findCompletedTaskBySetByMe(String email, String completed);

	/**
	 * @role abstract method for retrieving count of subject value
	 * @param name: takes subject value
	 * @return int value
	 */

	@Query("Select  count(*) from CreateTaskBean t where t.subject LIKE :name%")
	int countSubject(String name);

	/**
	 * @role abstract method for retrieving completed task sent by user
	 * @param email:      takes email value
	 * @param completed:: takes completed value
	 * @return list of CreateTaskBean object
	 */
	@Query("select t from CreateTaskBean t where "
			+ " t.status='completed' and t.userBean.email=:email and t.completed=:completed")
	Set<CreateTaskBean> findCompletedTaskBySetToMe(String email, String completed);

	/**
	 * @role abstract method for finding completed task
	 * @param email: takes email value
	 * @return list of CreateTaskBean object
	 */
	@Query("select t from CreateTaskBean t where "
			+ " t.status='completed' and t.assignedTo=:email and t.completed!=null")
	List<CreateTaskBean> findCompletedByMe(String email);

	/**
	 * @role abstract method for finding end date of completed task
	 * @param email: takes email value
	 * @param from:  takes from date value
	 * @return list of string object
	 */
	@Query("select  t.completed " + " from CreateTaskBean t where "
			+ "t.status='completed' and t.assignedTo=:email and  t.completed>=:from")
	List<String> findEndDateByMe(String email, String from);

	/**
	 * @role abstract method for finding completed task send to user
	 * @param email:takes email value
	 * @return list of CreateTaskBean object
	 */
	@Query("select t from CreateTaskBean t where "
			+ " t.status='completed' and t.userBean.email=:email and t.completed!=null")
	List<CreateTaskBean> findCompletedToMe(String email);

	/**
	 * @role abstract method for finding completed date which is greater than end
	 *       date
	 * @param email: take email value
	 * @param from:  from date value
	 * @return list of string object
	 */
	@Query("select  t.completed " + " from CreateTaskBean t where "
			+ "t.status='completed' and t.userBean.email=:email and t.completed>=:from")
	List<String> findEndDateToMe(String email, String from);

	/**
	 * @role abstract method for retrieving task from to till date
	 * @param email: takes email value
	 * @param from:  takes from date from request
	 * @param to:    takes to date from request
	 * @return set of createTaskBean object
	 */
	@Query("select  t " + " from CreateTaskBean t where "
			+ " t.status='completed' and t.assignedTo=:email and t.completed between concat(:from ,'%') and concat(:to ,'%') ")
	TreeSet<CreateTaskBean> fromTo(String email, String from, String to);

	/**
	 * @role abstract method for finding assigned task by user based on search
	 * @param searchTerm: takes search value
	 * @param email:      take email value
	 * @return list of CreateTaskBean object
	 */
	@Query(value = "select t from CreateTaskBean t where ( t.description LIKE %:searchTerm% ) ")
	List<CreateTaskBean> findByMe(@Param("searchTerm") String searchTerm);

	/**
	 * @role abstract method for finding assigned task by user based on search
	 * @param searchTerm
	 * @param email
	 * @return
	 */
	@Query(value = "select t from CreateTaskBean t where t.assignedTo=:email and ( t.description LIKE %:searchTerm% )")
	List<CreateTaskBean> findToMe(@Param("searchTerm") String searchTerm, @Param("email") String email);

	/**
	 * @role abstract method for counting matching word present in descriptions
	 * @param name:
	 * @return count of description
	 */

	@Query("Select  count(*) from CreateTaskBean t where t.description LIKE %:name%")
	int countDescription(String name);

	@Modifying
	@Transactional
	@Query(value = "update  task_info set status=:status  where task_id=:taskId", nativeQuery = true)

	int update(int taskId, String status);

	@Query(value = "select * from task_info t where " + " t.project_id=:id", nativeQuery = true)
	List<CreateTaskBean> findProject(int id);

	@Query(value = "select * from task_info t where "
			+ " t.status='completed' and t.project_id=:id and t.completed!=null", nativeQuery = true)
	List<CreateTaskBean> findCompletedProject(int id);

	/*
	 * @Query(value = "select  t.completed " + " from task_info t where " +
	 * "t.status='completed' and t.project_id=:id and  t.completed>=:from",
	 * nativeQuery = true) List<String> findEndDateProject(int id, String from);
	 */

	@Query(value = "select * from task_info where   project_id=:pid and status='completed' ",nativeQuery = true)
	List<CreateTaskBean> findCompletedForProject(int pid);
	
	@Query(value = "select * from task_info where completed>=:dateFrom and project_id=:pid and status='completed' ",nativeQuery = true)
	TreeSet<CreateTaskBean> findCompletedDateForProject(int pid,String dateFrom);
	
	@Query("select  t " + " from CreateTaskBean t where "
			+ " t.status='completed' and t.projectBean.projectPkBean.projectId=:projectId and t.completed between concat(:from ,'%') and concat(:to ,'%') ")
	TreeSet<CreateTaskBean> fromTo(int projectId, String from, String to);
	
	/*
	 * @Query(value = "select c from  ComnentBean c where c.") List<CommentBean>
	 * getAllComment(int projectId);
	 */
	
}// end of interface