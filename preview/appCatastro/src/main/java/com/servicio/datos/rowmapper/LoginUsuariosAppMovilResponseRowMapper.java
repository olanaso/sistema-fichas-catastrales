package com.servicio.datos.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import com.servicio.datos.model.AppMovil.LoginUsuariosAppMovilResponse;

public class LoginUsuariosAppMovilResponseRowMapper implements RowMapper {
	
  public LoginUsuariosAppMovilResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
	  
	  LoginUsuariosAppMovilResponse loginUsuariosAppMovilResponse = new LoginUsuariosAppMovilResponse();
	  
	  loginUsuariosAppMovilResponse.setCodcliente(rs.getString("codcliente"));
	  loginUsuariosAppMovilResponse.setIdusuario(rs.getString("idusuario"));
	  loginUsuariosAppMovilResponse.setNombres(rs.getString("nombres"));
	  loginUsuariosAppMovilResponse.setApellidos(rs.getString("apellidos"));
	  loginUsuariosAppMovilResponse.setTipodocumento(rs.getString("tipodocumento"));
	  loginUsuariosAppMovilResponse.setNumerodocumento(rs.getString("numerodocumento"));
	  loginUsuariosAppMovilResponse.setEmail(rs.getString("email"));
	  loginUsuariosAppMovilResponse.setNrocelular(rs.getString("nrocelular"));
	  loginUsuariosAppMovilResponse.setRecibodigital(rs.getString("recibodigital"));
	  loginUsuariosAppMovilResponse.setRecibirNotificaciones(rs.getString("recibirNotificaciones"));
	  loginUsuariosAppMovilResponse.setEstadoregistro(rs.getString("estadoregistro"));
	  
	 
	
    return loginUsuariosAppMovilResponse;
  }
}
