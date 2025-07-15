package com.servicio.datos.service;

public interface TokenService {
	public boolean buscarTokenValido(String token, Integer tiempoToken);
	public void registrarToken(String token);
}
