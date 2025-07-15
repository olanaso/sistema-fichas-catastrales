package com.servicio.datos.service;

import com.servicio.datos.model.LocalidadesRequest;
import com.servicio.datos.repository.LocalidadesRepository;
import com.servicio.datos.service.LocalidadesService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocalidadesServiceImpl implements LocalidadesService {
  @Autowired
  private LocalidadesRepository localidadesRepository;
  
  public List<LocalidadesRequest> ObtenerLocalidad(LocalidadesRequest localidades) {
    return this.localidadesRepository.ObtenerLocalidad(localidades);
  }
}
