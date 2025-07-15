package com.servicio.datos.model;


import java.util.List;
import lombok.Data;
@Data
public class DptoResponse {

	 private List<DptoRequest> departamentos;
	  
	  private String mensaje;
	  
	  private String codigo;
	  
	  private boolean success;
	
}
