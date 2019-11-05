package com.taskmanagement;
/**
 * @Task Spring boot application starter class
 * @SpringBootApplication annotation is used to mark a configuration class that declares one or more
 * Bean methods and also triggers auto-configuration and component scanning
 */

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaskManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskManagementApplication.class, args);
	}
}
