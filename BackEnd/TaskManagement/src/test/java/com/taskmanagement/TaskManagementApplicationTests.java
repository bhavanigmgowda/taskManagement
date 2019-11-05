package com.taskmanagement;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.taskmanagement.dto.Response;
import com.taskmanagement.dto.UserBean;
import com.taskmanagement.repository.UserRepository;
import com.taskmanagement.service.UserServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TaskManagementApplicationTests {


	
	
	private UserServiceImpl user = new UserServiceImpl();

	@Test
	public void contextLoads() {
		Response actual = user.login("abc@gmail.com", "QW12qw");

		UserBean bean = new UserBean();
		bean.setEmail("abc@gmail.com");
		bean.setEmployeeId(1);
		bean.setEmployeeName("admin");
		bean.setDesignation("developer");
		bean.setPassword("QW12qw");
		
		Response expected=new Response();
		expected.setStatusCode(201);
		expected.setMessage("Success");
		expected.setDescription("Login successfully");
		expected.setUserBean(Arrays.asList(bean));
		expected.setTaskBean(null);
		expected.setEnd(null);
		
		assertEquals(expected, actual);
		System.out.println("executed");
	}

}
