package com.servicio.datos.model.AppMovil;

import java.util.Date;
import java.util.List;

import lombok.Data;
@Data
public class LoginUsuariosAppMovilResponse {

	
	  private String codcliente;
	  private String idusuario;
	  private String nombres;
	  private String apellidos;
	  private String tipodocumento;
	  private String numerodocumento;
	  private String email;
	  private String nrocelular;
	  private String recibodigital;
	  private String recibirNotificaciones;
	  private String mensaje;
	  String estadoregistro;
	  
	  private String codigo;
	  
	  private boolean success;
}
