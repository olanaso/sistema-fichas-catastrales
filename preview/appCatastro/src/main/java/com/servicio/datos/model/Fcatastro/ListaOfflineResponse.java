package com.servicio.datos.model.Fcatastro;

import java.util.Date;
import java.util.List;

import lombok.Data;
@Data
public class ListaOfflineResponse {
	

	
			
	List<ListaOfflineRequest> listGeneral;
	String mensaje;
	String codigo;
	boolean success;
}

	  

