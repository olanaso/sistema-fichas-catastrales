package com.servicio.datos.service;

import com.servicio.datos.model.DptoProvRequest;
import com.servicio.datos.repository.DptoProvRepository;
import com.servicio.datos.service.DptoProvService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DptoProvServiceImpl implements DptoProvService {
  @Autowired
  private DptoProvRepository dptoProvRepository;
  
  public List<DptoProvRequest> ObtenerDepartamentosPrv(DptoProvRequest departamentosPrv) {
    return this.dptoProvRepository.ObtenerDepartamentosPrv(departamentosPrv);
  }
}
