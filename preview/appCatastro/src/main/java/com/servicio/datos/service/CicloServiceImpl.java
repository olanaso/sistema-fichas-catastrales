package com.servicio.datos.service;

import com.servicio.datos.model.CiclosRequest;
import com.servicio.datos.repository.CiclosRepository;
import com.servicio.datos.service.CicloService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CicloServiceImpl implements CicloService {
  @Autowired
  private CiclosRepository ciclosRepository;
  
  public List<CiclosRequest> ObtenerCiclos(CiclosRequest ciclos) {
    return this.ciclosRepository.ObtenerCiclos(ciclos);
  }
}
