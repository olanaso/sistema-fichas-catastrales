package com.servicio.datos.service.Fcatastro;



import com.servicio.datos.model.Fcatastro.ListaOfflineRequest;
import com.servicio.datos.repository.Fcatastro.ListaOfflineRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class listaOfflineServiceImpl implements listaOfflineService {

	 @Autowired
	  private ListaOfflineRepository listaOfflineRepository;

	@Override
	public List<ListaOfflineRequest> genera_lista(ListaOfflineRequest registraUsuarioAppMovilRequest) {
		
		return listaOfflineRepository.genera_listaCorte(registraUsuarioAppMovilRequest);
	}

}
