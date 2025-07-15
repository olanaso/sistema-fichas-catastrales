package com.servicio.datos.model;

import java.util.Date;
import java.util.List;

import lombok.Data;
@Data
public class ClienteRequest {

	String codemp;
	String tipo_usuario ; 
	String	id_sucursal ; 
	String nombre_sucursal ; 
	String id_sector ; 
	String  id_manzana ; 
	String	nro_lote ; 
	String 			nro_sublote ; 
	String id_cliente ; 
	String nombre_cliente ; 
	String descripcion_urba ; 
	String descripcion_corta ; 
	String descripcion_calle ; 
	String nro_calle ; 
	String cod_ruta_distribucion ; 
	String nro_orden_ruta_distribucion ; 
	String id_estado_servicio ; 
	String tipo_servicio ; 
	String catetarifa ; 
	String unidades_uso ; 
	String actividad ; 
	String nromedidor ; 
	String tipo_promedio ; 
	String lectura_anterior ; 
	String lectura_ultima ; 
	String consumo ; 
	String situacion_medidor ; 
	String consumo_facturacion ; 
	String importe_mes_deuda ; 
	String importe_deuda ; 
	String importe_deuda_refinanci ; 
	String fecha_corte;
	String token;
	String codcliente;
	String catastro;
	String cod_ant;
	
	String codsede;
	String codins;
	String tipodescarga;
	
}
