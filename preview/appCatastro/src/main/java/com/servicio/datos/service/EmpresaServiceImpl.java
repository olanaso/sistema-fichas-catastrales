package com.servicio.datos.service;

import com.servicio.datos.model.EmpresaRequest;
import com.servicio.datos.model.EmpresaResponse;
import com.servicio.datos.repository.EmpresaRepository;
import com.servicio.datos.service.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpresaServiceImpl implements EmpresaService {
  @Autowired
  private EmpresaRepository empresaRepository;
  
  public EmpresaResponse empresa(EmpresaRequest empresa) {
    return this.empresaRepository.empresa(empresa);
  }
}
