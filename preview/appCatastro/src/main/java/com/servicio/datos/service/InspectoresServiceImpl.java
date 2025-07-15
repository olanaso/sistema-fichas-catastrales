package com.servicio.datos.service;


import com.servicio.datos.model.InspectoresRequest;
import com.servicio.datos.repository.AppMovil.InspectoresRepository;
import com.servicio.datos.service.InspectoresService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InspectoresServiceImpl implements InspectoresService {
  @Autowired
  private InspectoresRepository inspectoresRepository;
  
  public List<InspectoresRequest> ObtenerInspectores(InspectoresRequest inspectores) {
    return this.inspectoresRepository.ObtenerInspectores(inspectores);
  }
}
