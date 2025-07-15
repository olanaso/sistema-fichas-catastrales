package com.servicio.datos.service;
import com.servicio.datos.model.DptoProvRequest;
import java.util.List;

public interface DptoProvService {
  List<DptoProvRequest> ObtenerDepartamentosPrv(DptoProvRequest paramDptoProvRequest);
}
