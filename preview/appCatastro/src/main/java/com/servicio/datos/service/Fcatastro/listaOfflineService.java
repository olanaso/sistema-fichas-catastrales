package com.servicio.datos.service.Fcatastro;

import java.util.List;

import com.servicio.datos.model.Fcatastro.ListaOfflineRequest;

public interface listaOfflineService {
	
	List<ListaOfflineRequest> genera_lista(ListaOfflineRequest registraUsuarioAppMovilRequest);
}
