package com.servicio.datos.model;

import java.util.Date;
import java.util.List;

import lombok.Data;
@Data
public class Response {
	private String message;
	  
	  private boolean success;
	  
	  public String toString() {
	    return "Response(message=" + getMessage() + ", success=" + isSuccess() + ")";
	  }}