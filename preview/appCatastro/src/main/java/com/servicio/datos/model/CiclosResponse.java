package com.servicio.datos.model;
import java.util.List;
@lombok.Data
public class CiclosResponse {
	
	  private List<CiclosRequest> ciclos;
	  
	  private String mensaje;
	  
	  private String codigo;
	  
	  private boolean success;
}
