package com.servicio.datos.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.servicio.datos.model.UsuarioResponse;
import com.servicio.datos.model.UsuarioWEBResponse;

public class UsuarioResponseRowMapper implements RowMapper {
	@Override
	public UsuarioResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		
		
		UsuarioResponse usuarioResponse=new UsuarioResponse(); 
		usuarioResponse.setCodUsuario(rs.getString("codusu"));
		usuarioResponse.setApellidoPat(rs.getString("apellidopa"));
		usuarioResponse.setApellidoMat(rs.getString("apellidoma"));
		usuarioResponse.setNombre(rs.getString("nombre"));
		return usuarioResponse;
	  }
}
