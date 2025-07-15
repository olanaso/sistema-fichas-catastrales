package com.servicio.datos.model;

import java.util.Date;
import java.util.List;

import lombok.Data;
@Data
public class ListaofflineResponse {

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
	  
	  private String mensaje;
	  
	  private String codigo;
	  
	  private boolean success;
}
