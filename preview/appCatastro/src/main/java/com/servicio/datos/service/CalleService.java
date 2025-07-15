package com.servicio.datos.service;
import com.servicio.datos.model.CalleRequest;
import java.util.List;

public interface CalleService {
  List<CalleRequest> ObtenerCalle(CalleRequest paramCalleRequest);
}
