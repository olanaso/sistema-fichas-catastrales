package com.servicio.datos.service;


import com.servicio.datos.model.ClienteRequest;
import com.servicio.datos.model.ClienteResponse;
import com.servicio.datos.repository.ClienteRepository;
import com.servicio.datos.service.SedeOperacionalService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteServiceImpl implements ClienteService {
  @Autowired
  private ClienteRepository clienteRepository;
  
  public ClienteResponse ObtenerData(ClienteRequest cliente) {
	    return this.clienteRepository.ObtenerData(cliente);
	  }
}
