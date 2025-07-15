package com.servicio.datos.model;
import java.util.List;

import lombok.Data;
@Data
public class LocalidadesResponse {
	
	 private List<LocalidadesRequest> localidades;
	  
	  private String mensaje;
	  
	  private String codigo;
	  
	  private boolean success;
	  
	  
}
