package com.servicio.datos.exception;

public class LoginException extends Exception {
	public LoginException(){
		super("Usuario y/o clave incorrectos");
	}
}
