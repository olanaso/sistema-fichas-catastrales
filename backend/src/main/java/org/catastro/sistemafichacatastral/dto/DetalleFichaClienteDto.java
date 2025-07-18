package org.catastro.sistemafichacatastral.dto;

import lombok.Data;

@Data
public class DetalleFichaClienteDto {
    // Datos del inmueble/predio
    private String region;
    private String sucursal;
    private String sector;
    private String mzna;
    private String lote;
    private String sublote;
    private Integer suministro;
    private String calle;
    private String cuadra;
    private String nromuni;
    private String mzmuni;
    private String ltmuni;
    private String urbanizacion;
    private String tipoconstruccion;
    private String nropisos;
    private String tiposervicio_campo;
    private String abastecimiento;
    private String piscina;
    private String almacenaje;

    // Datos del usuario
    private String tipousuario;
    private String apellidosnombre_campo;
    private String dni;
    private String habitantes;
    private String tiporesponsable;
    private String telefono;
    private String nrocontrato;
    private String reservorio;
    private String sectabastecimiento;
    private String categoriascampo;
    private String actividades;
    private String razonsocial;

    // Datos de conexión de agua
    private String estservicio_a;
    private String pavimento_a;
    private String vereda_a;
    private String diametrocampo_a;
    private String materialtubo_a;
    private String tipoingreso_a;
    private String caja_a;
    private String materialcaja_a;
    private String localizacion_a;
    private String estadocaja_a;
    private String tapa_a;
    private String materialtapa_a;
    private String estadotapa_a;
    private String llaves;
    private String posicionmedidor;
    private String tipocorte_a;
    private String razoncorte;
    private String fugas_a;
    private String tipocajaobserv_a;

    // Datos del medidor
    private String tienemedidor;
    private String medidorcampo;
    private String modelomedidor;
    private String anio;
    private Integer lecturamedidor;
    private String fechainstalacion;
    private String marcamedidor;
    private String diametromedidor;
    private Integer lectura;
    private String tipofacturacion;
    private String tipolectura;
    private String estadomedidor;
    private String medidoroperativo;

    // Datos de conexión de desagüe
    private String estservicio_d;
    private String diametrocampo_d;
    private String materialtubo_d;
    private String caja_d;
    private String materialcaja_d;
    private String localizacion_d;
    private String estadocaja_d;
    private String tapa_d;
    private String tipotapa_d;
    private String estadotapa_d;
    private String fugas_d;
    private String horasxdia;
    private String diasxsemana;
    private String presionagu;
    private Integer nrolavatorios;
    private String estadolavatorios;
    private Integer nrolavadoras;
    private String estadolavadoras;
    private Integer nrowater;
    private String estadowater;
    private Integer nroduchas;
    private String estadoduchas;
    private Integer nrourinarios;
    private String estadourinarios;
    private Integer nrogrifos;
    private String estadogrifos;
    private Integer nropiscina;
    private String estadopiscina;
    private Integer nrotanquecisterna;
    private String estadotanquecisterna;
    private Integer nrotanqueelevado;
    private String estadotanqueelevado;

    // Calidad de servicio y observaciones
    private String observacion;
    private String fichaincompleta;
    private String tipoacccomercial;

    // Datos de encuesta y supervisión
    private String encuestador;
    private String fecencuestador;
    private String calidad;
    private String feccalidad;
    private String supervisor;
    private String fecsupervisor;
    private String supervision;
    private String fecsupervision;

    // Datos adicionales
    private Integer objectid;
    private String posicionx;
    private String posiciony;
    private String usermodificador;
    private String fechamodificacion;
    private String codcatastral;
    private String coddist;
    private String codsector_new;
    private String codmza_new;
    private String nrolote_new;
    private String nrosublote_new;
    private String propietario;
    private String fecha;
    private String fotofachada;
    private String fotocajaagua;
    private String fotocajadesague;
    private String nromed_sistema;
    private Double medidalotefrente;
    private Double medidaejeagua;
    private Double medidaejedesague;
    private Integer fichaaprobada;
    private String fechaaprobacion;
    private Integer codcalle;
    private String codurbaso;
    private String actividad;
    private String catetar;
    private String desactividad;
    private String descatetar;
    private String unidades_uso;
    private String fotodetalle4;
    private String fotodetalle5;
}
