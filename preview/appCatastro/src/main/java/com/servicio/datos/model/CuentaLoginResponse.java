package com.servicio.datos.model;

import java.util.List;

@lombok.Data
public class CuentaLoginResponse {

	  private List<CuentaLoginRequest> login;
	  
	  private String mensaje;
	  
	  private String codigo;
	  
	  private boolean success;
	  
}
