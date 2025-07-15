package com.servicio.datos.exception;

public class ServiceException extends Exception{

	public ServiceException(Exception e){
		
		super("Error en Service"+e);
		
	}
}
