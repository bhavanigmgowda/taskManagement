package com.searchfilter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.searchfilter.dto.Response;
import com.searchfilter.repository.FilterRepository;

public class FilterController {

	@Autowired
	FilterRepository filter;
	
	@GetMapping(path = "/result" , produces = MediaType.APPLICATION_JSON_VALUE)
	public Response  getResult(@RequestParam("checkOne") String checkOne, @RequestParam("checkTwo") String checkTwo,	
			@RequestParam("checkThree") String checkThree, @RequestParam("checkFour") String checkFour) {
		
		Response res=new Response();
		//res.setBeans(filter.findAll(checkOne, checkTwo, checkThree, checkFour));
		return null;
		
	}
}
