package com.servicio.datos.service;


import com.servicio.datos.model.ActividadRequest;
import com.servicio.datos.model.ActividadResponse;
import java.util.List;

public interface ActividadService {
	 List<ActividadRequest> actividades();
}
