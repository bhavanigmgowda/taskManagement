package com.taskmanagement.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.taskmanagement.dto.ProjectBean;
import com.taskmanagement.dto.ProjectPKBean;
import com.taskmanagement.dto.UserBean;

public interface ProjectRepository extends JpaRepository<ProjectBean, ProjectPKBean> {

	@Query("select c from ProjectBean c where c.projectPkBean=:pkbean")
	Optional<ProjectBean> findUserById(ProjectPKBean pkbean);

	@Query("select c from ProjectBean c where c.projectPkBean.projectId=:projectId")
	List<ProjectBean> getAll(int projectId);

	@Query("select c from ProjectBean c where c.projectPkBean.projectId=:projectId")
	List<ProjectBean> getAllMembers(int projectId);

	@Query("select count(*) from ProjectBean c where c.projectPkBean.projectId=:projectId")
	int findProjectById(int projectId);

	@Query("select count(*) from ProjectBean c where c.projectPkBean.userBean.email=:email")
	int getProjectsByEmail(String email);

	@Query("select c from ProjectBean c where c.projectPkBean.userBean.email=:email")
	List<ProjectBean> getAllProjectsByEmaill(String email);

	@Query(value = "select c from ProjectBean c where c.projectPkBean.userBean.email=:email and c.projectPkBean.projectId in"
			+ "(select c.projectBean.projectPkBean.projectId from CreateTaskBean c) ")
	List<ProjectBean> getProjectsByEmaill(String email);

	@Query("select c from ProjectBean c where c.projectPkBean.projectId=:projectId and :pId= (select c.projectPkBean.projectId from  ProjectBean c where c.projectPkBean.userBean.employeeName=:name)")
	List<ProjectBean> searchMember(String name, int pId);

	@Query(value = "select * from project_info where project_id=:groupId and emp_id=(select emp_id from user where email=:email)", nativeQuery = true)
	Optional<ProjectBean> getProjectsByEmaill(String email, int groupId);

	@Modifying
	@Transactional
	@Query(value = "alter table project_info change project_id project_id INT(10) AUTO_INCREMENT", nativeQuery = true)
	int alterProjectId();

	List<ProjectBean> findByProjectName(String projectname);

	@Modifying
	@Transactional
	@Query(value = "update task_info set assigned_to=:newEmail , e_id=(select emp_id from user where email=:newEmail) where e_id=(select emp_id from user where email=:removeEmail) and           project_id=:groupId ", nativeQuery = true)
	int updateTask(int groupId, String newEmail, String removeEmail);

	@Modifying
	@Transactional
	@Query(value = "delete from project_info  where project_id=:projectId and emp_id=(select emp_id from user where email=:removeEmail)", nativeQuery = true)
	int removeUserFromProject(int projectId, String removeEmail);

	/*
	 * @Query("select p.projectPkBean.userBean from ProjectBean p where  p.projectPkBean.projectId in "
	 * +
	 * "(select  p.projectPkBean.projectId from ProjectBean p where  p.projectPkBean.userBean.email=:email)"
	 * )
	 */
	
	@Query("select p.projectPkBean.projectId from ProjectBean p where p.projectPkBean.userBean.email=:email")
	List<Integer> getUserForSearchForProject(String email);
	
	@Query("select p.projectPkBean.userBean from ProjectBean p where p.projectPkBean.projectId=:projectId ")
	Set<UserBean> getAllUser(int projectId);
	
	@Query(value = "select count(*) from user c where c.emp_id in (select emp_id from project_info where project_id=:projectId)" ,nativeQuery = true)
	int getCount(int projectId);
	
	
	@Query("select p from ProjectBean p where p.projectName like :projectName% and p.projectPkBean.userBean.email=:email")
	List<ProjectBean> getProjects(String email, String projectName);
}
