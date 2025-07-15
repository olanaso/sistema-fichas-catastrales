package com.servicio.datos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servicio.datos.repository.TokenRepository;

@Service
public class TokenServiceImpl implements TokenService {

	
	@Autowired
	private TokenRepository tokenRepository;
	
	public boolean buscarTokenValido(String token, Integer tiempoToken) {
		return tokenRepository.buscarTokenValido(token, tiempoToken);
	}
	
	public void registrarToken(String token) {
		tokenRepository.registrarToken(token);
	}
	
}
