package com.servicio.datos.model;

import java.util.Date;
import java.util.List;

import lombok.Data;
@Data
public class ActividadResponse {

	  List<ActividadRequest> actividad;
	   String mensaje;
	   String codigo;
	   boolean success;
}
