package com.servicio.datos.service;

import com.servicio.datos.model.UrbanizacionVO;
import com.servicio.datos.repository.UrbanizacionRepository;
import com.servicio.datos.service.UrbanizacionService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UrbanizacionServiceImpl implements UrbanizacionService {
  @Autowired
  private UrbanizacionRepository urbanizacionRepository;
  
  public List<UrbanizacionVO> ObtenerUrbanizacion(UrbanizacionVO urbanizacion) {
    return this.urbanizacionRepository.Urban(urbanizacion);
  }
}
