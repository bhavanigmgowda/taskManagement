package com.taskmanagement.serviceimpltest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import org.junit.Test;

import com.taskmanagement.dto.Response;
import com.taskmanagement.dto.UserBean;
import com.taskmanagement.service.UserServiceImpl;

public class UserServiceImplTest {

	private UserServiceImpl user=new UserServiceImpl();
	@Test
	public void test() {
		fail("Not yet implemented");
	}

	@Test
	public void login(String email, String password) {
		
		Response actual=user.login("abc@gmail.com","QW12qw");
		
		
	UserBean expected=new UserBean();
	expected.setEmail("abc@gmail.com");
	expected.setEmployeeId(1);
	expected.setEmployeeName("admin");
	expected.setDesignation("developer");
	expected.setPassword("QW12qw");
		
		assertEquals(expected, actual);
		System.out.println("executed");
	}

	
}
