package com.servicio.datos.rowmapper;

import com.servicio.datos.model.ClienteRequest;
import com.servicio.datos.model.ClienteResponse;
import com.servicio.datos.model.SedeOperacionalRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class ClienteRowMaper implements RowMapper {
	
	
	public ClienteResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		  
		ClienteResponse clienteRequest = new ClienteResponse();
		  
		  
		  clienteRequest.setTipo_usuario(rs.getString("tipo_usuario"));
		  clienteRequest.setId_sucursal(rs.getString("id_sucursal"));
		  clienteRequest.setNombre_sucursal(rs.getString("nombre_sucursal"));
		  clienteRequest.setId_sector(rs.getString("id_sector"));
		  clienteRequest.setId_manzana(rs.getString("id_manzana"));
		  clienteRequest.setNro_lote(rs.getString("nro_lote"));
		  clienteRequest.setNro_sublote(rs.getString("nro_sublote"));
		  clienteRequest.setId_cliente(rs.getString("id_cliente"));
		  clienteRequest.setNombre_cliente(rs.getString("nombre_cliente"));
		  clienteRequest.setDescripcion_urba(rs.getString("descripcion_urba"));
		  clienteRequest.setDescripcion_corta(rs.getString("descripcion_corta"));
		  clienteRequest.setDescripcion_calle(rs.getString("descripcion_calle"));
		  clienteRequest.setNro_calle(rs.getString("nro_calle"));
		  clienteRequest.setCod_ruta_distribucion(rs.getString("cod_ruta_distribucion"));
		  clienteRequest.setNro_orden_ruta_distribucion(rs.getString("nro_orden_ruta_distribucion"));
		  clienteRequest.setId_estado_servicio(rs.getString("id_estado_servicio"));
		  clienteRequest.setTipo_servicio(rs.getString("tipo_servicio"));
		  clienteRequest.setCatetarifa(rs.getString("catetarifa"));
		  clienteRequest.setUnidades_uso(rs.getString("unidades_uso"));
		  clienteRequest.setActividad(rs.getString("actividad"));
		  clienteRequest.setNromedidor(rs.getString("nromedidor"));
		  clienteRequest.setTipo_promedio(rs.getString("tipo_promedio"));
		  clienteRequest.setLectura_anterior(rs.getString("lectura_anterior"));
		  clienteRequest.setLectura_ultima(rs.getString("lectura_ultima"));
		  clienteRequest.setConsumo(rs.getString("consumo"));
		  clienteRequest.setSituacion_medidor(rs.getString("situacion_medidor"));
		  clienteRequest.setConsumo_facturacion(rs.getString("consumo_facturacion"));
		  clienteRequest.setImporte_mes_deuda(rs.getString("importe_mes_deuda"));
		  clienteRequest.setImporte_deuda(rs.getString("importe_deuda"));
		  clienteRequest.setImporte_deuda_refinanci(rs.getString("importe_deuda_refinanci"));
		  clienteRequest.setFecha_corte(rs.getString("fecha_corte"));
		  clienteRequest.setCatastro(rs.getString("catastro"));
		  clienteRequest.setCod_ant(rs.getString("cod_ant"));
		  clienteRequest.setDiametro_agua(rs.getString("diametro_agua"));
		  clienteRequest.setTipousuario(rs.getString("tipousuario"));
		  clienteRequest.setMesesdeuda(rs.getString("mesesdeuda"));
		  
		  
	    return clienteRequest;
	    
	
	  }
}
