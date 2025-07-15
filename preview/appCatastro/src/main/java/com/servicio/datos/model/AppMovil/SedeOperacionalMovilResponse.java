package com.servicio.datos.model.AppMovil;

import java.util.Date;
import java.util.List;

import lombok.Data;
@Data
public class SedeOperacionalMovilResponse {

	 private List<SedeOperacionalMovilRequest> listSedes;
	 private String mensaje;
	 private String codigo;
	 private boolean success;
}
