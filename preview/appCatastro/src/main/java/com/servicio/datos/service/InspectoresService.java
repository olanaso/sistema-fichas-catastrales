package com.servicio.datos.service;


import com.servicio.datos.model.InspectoresRequest;
import java.util.List;

public interface InspectoresService {
  List<InspectoresRequest> ObtenerInspectores(InspectoresRequest paramInspectoresRequest);
}
