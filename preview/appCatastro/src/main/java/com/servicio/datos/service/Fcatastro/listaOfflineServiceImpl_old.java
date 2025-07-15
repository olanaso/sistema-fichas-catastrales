package com.servicio.datos.service.Fcatastro;


import com.servicio.datos.model.ClienteRequest;
import com.servicio.datos.model.ClienteResponse;
import com.servicio.datos.model.ListaofflineResponse;
import com.servicio.datos.repository.ClienteRepository;
import com.servicio.datos.repository.Fcatastro.ListaOfflineRepository_old;
import com.servicio.datos.service.SedeOperacionalService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class listaOfflineServiceImpl_old implements listaOfflineService_old {
  @Autowired
  private ListaOfflineRepository_old listaOfflineRepository;
  
  public ListaofflineResponse ObtenerData(ClienteRequest cliente) {
	    return this.listaOfflineRepository.ObtenerData(cliente);
	  }
}
