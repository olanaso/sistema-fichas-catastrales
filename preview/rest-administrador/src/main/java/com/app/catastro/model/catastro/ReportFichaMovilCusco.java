package com.app.catastro.model.catastro;

import com.fasterxml.jackson.annotation.JsonInclude;

@lombok.Data

public class ReportFichaMovilCusco {
	
	String region;
	String sucursal;
	String sector;
	String mzna;
	String lote;
	String sublote;
	String suministro;
	String calle;
	String cuadra;
	String nromuni;
	String mzmuni;
	String ltmuni;
	String urbanizacion;
	String tipoconstruccion;
	String nropisos;
	String tiposervicio_campo;
	String abastecimiento;
	String piscina;
	String almacenaje;
	String tipousuario;
	String apellidosnombre_campo;
	String dni;
	String habitantes;
	String tiporesponsable;
	String telefono;
	String nrocontrato;
	String reservorio;
	String sectabastecimiento;
	String categoríascampo;
	String actividades;
	String razonsocial;
	String estservicio_a;
	String pavimento_a;
	String vereda_a;
	String diametrocampo_a;
	String materialtubo_a;
	String tipoingreso_a;
	String caja_a;
	String materialcaja_a;
	String localizacion_a;
	String estadocaja_a;
	String tapa_a;
	String materialtapa_a;
	String estadotapa_a;
	String llaves;
	String posicionmedidor;
	String tipocorte_a;
	String razoncorte;
	String fugas_a;
	String tipocajaobserv_a;
	String tienemedidor;
	String medidorcampo;
	String modelomedidor;
	String anio;
	String lecturamedidor;
	String fechainstalacion;
	String marcamedidor;
	String diametromedidor;
	String lectura;
	String tipofacturacion;
	String tipolectura;
	String estadomedidor;
	String medidoroperativo;
	String estservicio_d;
	String diametrocampo_d;
	String materialtubo_d;
	String caja_d;
	String materialcaja_d;
	String localizacion_d;
	String estadocaja_d;
	String tapa_d;
	String tipotapa_d;
	String estadotapa_d;
	String fugas_d;
	String horasxdia;
	String diasxsemana;
	String presionagu;
	String nrolavatorios;
	String estadolavatorios;
	String nrolavadoras;
	String estadolavadoras;
	String nrowater;
	String estadowater;
	String nroduchas;
	String estadoduchas;
	String nrourinarios;
	String estadourinarios;
	String nrogrifos;
	String estadogrifos;
	String nropiscina;
	String estadopiscina;
	String nrotanquecisterna;
	String estadotanquecisterna;
	String nrotanqueelevado;
	String estadotanqueelevado;
	String observacion;
	String fichaincompleta;
	String tipoacccomercial;
	String encuestador;
	String fecencuestador;
	String calidad;
	String feccalidad;
	String supervisor;
	String fecsupervisor;
	String supervision;
	String fecsupervision;
	String objectID;
	String posicionx;
	String posiciony;
	String usermodificador;
	String fechamodificacion;
	
	String fotofachada;
	String fotocajaagua;
	String fotocajadesague;
	


	
	String codcatastral;
	String coddist;
	String codsector_new;
	String codmza_new;
	String nrolote_new;
	String nrosublote_new;
	String propietario;
	String fecha;
	
	String estadoficha;
	String condicionficha   ;
	
	
	
	@JsonInclude(JsonInclude.Include.NON_NULL)
	String inspector;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	String codempre;
	 @JsonInclude(JsonInclude.Include.NON_NULL)
	String codsuc;
	 @JsonInclude(JsonInclude.Include.NON_NULL)
	String fechaini;
	 @JsonInclude(JsonInclude.Include.NON_NULL)
	String fechafin;
	 @JsonInclude(JsonInclude.Include.NON_NULL)
	String codsector;
	 @JsonInclude(JsonInclude.Include.NON_NULL)
	String codbrigada;
	
	
    
     

}



