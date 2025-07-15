package com.servicio.datos.service;

import com.servicio.datos.model.EmpresasRequest;
import com.servicio.datos.repository.EmpresasRepository;
import com.servicio.datos.service.EmpresasService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpresasServiceImpl implements EmpresasService {
  @Autowired
  private EmpresasRepository empresasRepository;
  
  public List<EmpresasRequest> ObtenerEmpresas(EmpresasRequest empresas) {
    return this.empresasRepository.ObtenerEmpresas(empresas);
  }
}
