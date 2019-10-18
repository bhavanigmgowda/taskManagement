package com.searchfilter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.searchfilter.dto.Response;
import com.searchfilter.repository.FilterRepository;

@RestController
public class FilterController {

	@Autowired
	FilterRepository filter;
	
	
	
	@GetMapping(path = "/result" , produces = MediaType.APPLICATION_JSON_VALUE)
	public Response  getResult(@RequestParam("cname") String cname, @RequestParam("desc") String desc,	
			@RequestParam("skill") String skill, @RequestParam("experience") String experience) {
		
		Response res=new Response();
		res.setBeans(filter.findAll(cname, desc, skill, experience));
		return res;
		
	}
	@GetMapping(path = "/data" , produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getData() {
		System.out.println("working");
		Response res=new Response();
		res.setBeans(filter.findAll());
		return res;
	}
}
