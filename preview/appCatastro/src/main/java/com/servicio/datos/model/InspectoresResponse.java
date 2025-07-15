package com.servicio.datos.model;
import java.util.List;

import lombok.Data;
@Data
public class InspectoresResponse {
	
	private List<InspectoresRequest> inspectores;
	  
	  private String mensaje;
	  
	  private String codigo;
	  
	  private boolean success;
}
