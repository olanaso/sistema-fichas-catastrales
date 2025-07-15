package com.servicio.datos.service.Fcatastro;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import com.servicio.datos.model.Fcatastro.ListaOfflineRequest;

public class ListaOfflineRowMaper implements RowMapper {
	
  public ListaOfflineRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
	  
	  ListaOfflineRequest clienteRequest= new ListaOfflineRequest();
	  
	  
	  clienteRequest.setId_sucursal(rs.getString("id_sucursal"));
	  clienteRequest.setId_sector(rs.getString("id_sector"));
	  clienteRequest.setId_manzana(rs.getString("id_manzana"));
	  clienteRequest.setNro_lote(rs.getString("nro_lote"));
	  clienteRequest.setNro_sublote(rs.getString("nro_sublote"));
	  clienteRequest.setId_cliente(rs.getString("id_cliente"));
	  clienteRequest.setNombre_cliente(rs.getString("nombre_cliente"));
	  clienteRequest.setDescripcion_corta(rs.getString("descripcion_corta"));
	  clienteRequest.setDescripcion_calle(rs.getString("descripcion_calle"));
	  clienteRequest.setNro_calle(rs.getString("nro_calle"));
	  clienteRequest.setId_estado_servicio(rs.getString("id_estado_servicio"));
	  clienteRequest.setTipo_servicio(rs.getString("tipo_servicio"));
	  clienteRequest.setUnidades_uso(rs.getString("unidades_uso"));
	  clienteRequest.setReferencia(rs.getString("referencia"));
	  clienteRequest.setDiametro_agua(rs.getString("diametro_agua"));
	  clienteRequest.setActividad(rs.getString("actividad"));
	  clienteRequest.setTipo_usuario(rs.getString("tipo_usuario"));
	  clienteRequest.setTipousuario(rs.getString("tipousuario"));
	  
	 
    return clienteRequest;
  }
}
