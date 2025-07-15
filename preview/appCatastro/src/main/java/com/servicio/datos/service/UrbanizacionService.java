package com.servicio.datos.service;

import com.servicio.datos.model.UrbanizacionVO;
import java.util.List;

public interface UrbanizacionService {
  List<UrbanizacionVO> ObtenerUrbanizacion(UrbanizacionVO paramUrbanizacionVO);
}
