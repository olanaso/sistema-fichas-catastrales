package com.servicio.datos.model;


import java.util.List;
import lombok.Data;
@Data
public class EmpresasResponse {

	private List<EmpresasRequest> empresa;
	  
	  private String mensaje;
	  
	  private String codigo;
	  
	  private boolean success;
}
