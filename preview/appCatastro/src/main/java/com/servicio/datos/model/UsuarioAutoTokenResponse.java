package com.servicio.datos.model;

import lombok.Data;

@Data
public class UsuarioAutoTokenResponse {
	
	private String token;
	private boolean success;
	
	
}
