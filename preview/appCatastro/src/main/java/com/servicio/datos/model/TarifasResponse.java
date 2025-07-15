package com.servicio.datos.model;

import java.util.Date;
import java.util.List;

import lombok.Data;
@Data
public class TarifasResponse {

	private List<TarifasRequest> tarifas;
	  
	  private String mensaje;
	  
	  private String codigo;
	  
	  private boolean success;
}
