package com.servicio.datos.exception;

public class DAOException extends Exception{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3778552865656572406L;

	public DAOException(Exception e){
		super("Error en DAO: " + e);
	}

}
