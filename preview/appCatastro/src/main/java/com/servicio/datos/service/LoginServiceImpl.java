package com.servicio.datos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servicio.datos.model.Usuario;
import com.servicio.datos.model.UsuarioResponse;
import com.servicio.datos.repository.UsuarioRepository;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public List<UsuarioResponse> ObtenerUsuario(Usuario usuario) {
		List<UsuarioResponse> listaUsuarioR=usuarioRepository.ObtenerUsuario(usuario);
		return listaUsuarioR;
	}
}
