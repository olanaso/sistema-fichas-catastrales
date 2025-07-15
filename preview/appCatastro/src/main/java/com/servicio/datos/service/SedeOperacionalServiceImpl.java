package com.servicio.datos.service;


import com.servicio.datos.model.SedeOperacionalRequest;
import com.servicio.datos.repository.SedeOperacionalRepository;
import com.servicio.datos.service.SedeOperacionalService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SedeOperacionalServiceImpl implements SedeOperacionalService {
  @Autowired
  private SedeOperacionalRepository sedeOperacionalRepository;
  
  public List<SedeOperacionalRequest> ObtenerSedes(SedeOperacionalRequest sede) {
    return this.sedeOperacionalRepository.ObtenerSede(sede);
  }
}
