package com.servicio.datos.service;

import com.servicio.datos.model.CiclosRequest;
import java.util.List;

public interface CicloService {
  List<CiclosRequest> ObtenerCiclos(CiclosRequest paramCiclosRequest);
}
