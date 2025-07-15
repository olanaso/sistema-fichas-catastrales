package com.servicio.datos.service;


import com.servicio.datos.model.SedeOperacionalRequest;
import java.util.List;

public interface SedeOperacionalService {
  List<SedeOperacionalRequest> ObtenerSedes(SedeOperacionalRequest paramSedeOperacionalRequest);
}
