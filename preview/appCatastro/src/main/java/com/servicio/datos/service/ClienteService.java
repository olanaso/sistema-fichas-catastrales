package com.servicio.datos.service;


import com.servicio.datos.model.ClienteRequest;
import com.servicio.datos.model.ClienteResponse;

import java.util.List;

public interface ClienteService {
	 ClienteResponse ObtenerData(ClienteRequest paramSedeOperacionalRequest);
}
