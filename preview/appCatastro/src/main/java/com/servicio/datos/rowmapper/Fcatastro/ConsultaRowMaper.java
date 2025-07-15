package com.servicio.datos.rowmapper.Fcatastro;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import com.servicio.datos.model.Fcatastro.ConsultaResponse;

public class ConsultaRowMaper implements RowMapper {
	
	public ConsultaResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		  
		  ConsultaResponse consultaResponse = new ConsultaResponse();
		  
		  consultaResponse.setCodemp(rs.getString("codemp"));
		  consultaResponse.setCodsuc(rs.getString("codsuc")); 
		  consultaResponse.setCodcliente(rs.getString("codcliente")); 
		  consultaResponse.setEstadoservicio(rs.getString("estadoservicio")); 
		  consultaResponse.setCodmza(rs.getString("codmza")); 
		  consultaResponse.setNrolote(rs.getString("nrolote")); 
		  consultaResponse.setNrosublote(rs.getString("nrosublote")); 
		  consultaResponse.setReferencia(rs.getString("referencia")); 
		  consultaResponse.setUrbanizacion(rs.getString("urbanizacion")); 
		  consultaResponse.setTiposervicio(rs.getString("tiposervicio")); 
		  consultaResponse.setTipousuario(rs.getString("tipousuario")); 
		  consultaResponse.setPropietario(rs.getString("propietario")); 
		  consultaResponse.setDireccion(rs.getString("direccion")); 
		  consultaResponse.setCoddiametro_a(rs.getString("coddiametro_a")); 
		  consultaResponse.setNromed(rs.getString("nromed")); 
		  consultaResponse.setCatetar(rs.getString("catetar")); 
		  consultaResponse.setNrocatastro(rs.getString("nrocatastro")); 
		  
	 
	    return consultaResponse;
  }
}
