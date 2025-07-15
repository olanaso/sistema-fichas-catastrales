package com.servicio.datos.service;

import com.servicio.datos.model.DptoRequest;
import com.servicio.datos.repository.DptoRepository;
import com.servicio.datos.service.DptoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DptoServiceImpl implements DptoService {
  @Autowired
  private DptoRepository dptoRepository;
  
  public List<DptoRequest> ObtenerDepartamentos(DptoRequest departamentos) {
    return this.dptoRepository.ObtenerDepartamentos(departamentos);
  }
}
