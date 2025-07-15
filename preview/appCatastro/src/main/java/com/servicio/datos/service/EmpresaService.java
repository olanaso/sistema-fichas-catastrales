package com.servicio.datos.service;

import com.servicio.datos.model.EmpresaRequest;
import com.servicio.datos.model.EmpresaResponse;

public interface EmpresaService {
  EmpresaResponse empresa(EmpresaRequest paramEmpresaRequest);
}
