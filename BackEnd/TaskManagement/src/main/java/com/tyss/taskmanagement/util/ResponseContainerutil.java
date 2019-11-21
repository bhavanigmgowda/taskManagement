package com.tyss.taskmanagement.util;

import com.tyss.taskmanagement.dto.Response;

public class ResponseContainerutil {
	private static final int SUCCESS_STATUS_CODE = 201;
	private static final int FAILURE_STATUS_CODE = 401;
	private static final int EXCEPTION_STATUS_CODE = 201;
	
	private static final String SUCCESS_MESSAGE = "Success";
	private static final String FAILURE_MESSAGE = "Failure";
	private static final String EXCEPTION_MESSAGE = "Exception";

	public static Response fillerSuccess(String description) {
		
		return Response.builder().statusCode(SUCCESS_STATUS_CODE).message(SUCCESS_MESSAGE).description(description).build();
	}

	public static Response fillerFailure(String description) {
		return	Response.builder().statusCode(FAILURE_STATUS_CODE).message(FAILURE_MESSAGE).description(description).build();
	}

	public static Response fillerException(String description) {
		return Response.builder().statusCode(EXCEPTION_STATUS_CODE).message(EXCEPTION_MESSAGE).description(description).build();
	}

}
