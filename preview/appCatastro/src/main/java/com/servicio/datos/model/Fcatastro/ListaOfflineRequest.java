package com.servicio.datos.model.Fcatastro;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
@Data
public class ListaOfflineRequest {
	


	String id_sucursal;
	String id_cliente;
	String id_estado_servicio; 
	String id_manzana; 
	String nro_lote; 
	String nro_sublote;
	String id_sector;  
	String referencia;
	String descripcion_corta; 
	String descripcion_calle; 
	String nro_calle; 
	String diametro_agua; 
	String unidades_uso;
	String actividad; 
	String tipo_servicio; 
	String nombre_cliente;
	String tipo_usuario;
	String tipousuario;
	@JsonIgnore
	String codemp;
	@JsonIgnore
	String codsede;
	@JsonIgnore
	String codins;
	@JsonIgnore
	String tipodescarga;
	@JsonIgnore
	
			String token;

	  
}
