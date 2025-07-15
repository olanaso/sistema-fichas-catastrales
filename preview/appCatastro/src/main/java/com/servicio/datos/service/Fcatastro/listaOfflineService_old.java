package com.servicio.datos.service.Fcatastro;


import com.servicio.datos.model.ClienteRequest;
import com.servicio.datos.model.ClienteResponse;
import com.servicio.datos.model.ListaofflineResponse;

import java.util.List;

public interface listaOfflineService_old {
	ListaofflineResponse ObtenerData(ClienteRequest paramSedeOperacionalRequest);
}
