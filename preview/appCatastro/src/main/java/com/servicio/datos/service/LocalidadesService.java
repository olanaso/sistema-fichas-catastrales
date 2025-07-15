package com.servicio.datos.service;

import com.servicio.datos.model.LocalidadesRequest;
import java.util.List;

public interface LocalidadesService {
  List<LocalidadesRequest> ObtenerLocalidad(LocalidadesRequest paramLocalidadesRequest);
}
