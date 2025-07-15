package com.servicio.datos.service;

import com.servicio.datos.model.DptoRequest;
import java.util.List;

public interface DptoService {
  List<DptoRequest> ObtenerDepartamentos(DptoRequest paramDptoRequest);
}
