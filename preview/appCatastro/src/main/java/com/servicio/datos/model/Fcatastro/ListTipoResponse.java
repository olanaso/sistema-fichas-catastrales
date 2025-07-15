package com.servicio.datos.model.Fcatastro;



import java.util.List;
import lombok.Data;
@Data
public class ListTipoResponse {


	
	
	private List<ListTipoRequest> listTipo;
	String mensaje;
	String codigo;
	boolean success;

	
}