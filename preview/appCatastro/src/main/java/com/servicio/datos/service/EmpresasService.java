package com.servicio.datos.service;

import com.servicio.datos.model.EmpresasRequest;
import java.util.List;

public interface EmpresasService {
  List<EmpresasRequest> ObtenerEmpresas(EmpresasRequest paramEmpresasRequest);
}
