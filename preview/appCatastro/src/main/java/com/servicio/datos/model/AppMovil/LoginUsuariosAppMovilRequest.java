package com.servicio.datos.model.AppMovil;

import java.util.Date;
import java.util.List;

import lombok.Data;
@Data
public class LoginUsuariosAppMovilRequest {

	
	  private String clave;
	  private String nrocelular;
	  private String email;
	  private String token;

	  
}
