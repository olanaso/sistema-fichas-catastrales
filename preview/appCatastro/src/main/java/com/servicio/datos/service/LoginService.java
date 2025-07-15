package com.servicio.datos.service;

import java.util.List;

import com.servicio.datos.model.Usuario;
import com.servicio.datos.model.UsuarioResponse;

public interface LoginService {

	public List<UsuarioResponse> ObtenerUsuario(Usuario usuario);
	
}
