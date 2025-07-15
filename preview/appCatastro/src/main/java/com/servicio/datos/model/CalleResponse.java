package com.servicio.datos.model;
import java.util.List;
@lombok.Data
public class CalleResponse {
	  private List<CalleRequest> listaCalle;
	  
	  private String mensaje;
	  
	  private String codigo;
	  
	  private boolean success;
}
