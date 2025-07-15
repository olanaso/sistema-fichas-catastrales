package com.servicio.datos.service;


import com.servicio.datos.model.CalleRequest;
import com.servicio.datos.repository.CalleRepository;
import com.servicio.datos.service.CalleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CalleServiceImpl implements CalleService {
  @Autowired
  private CalleRepository calleRepository;
  
  public List<CalleRequest> ObtenerCalle(CalleRequest calles) {
    return this.calleRepository.ObtenerCalle(calles);
  }
}
