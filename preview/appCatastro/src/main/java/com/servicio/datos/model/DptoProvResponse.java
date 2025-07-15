package com.servicio.datos.model;


import java.util.List;
import lombok.Data;
@Data
public class DptoProvResponse {

	 private List<DptoProvRequest> departamentosPrv;
	  
	  private String mensaje;
	  
	  private String codigo;
	  
	  private boolean success;
	  
	
}
