package com.servicio.datos.service;

import com.servicio.datos.model.CuentaLoginRequest;
import java.util.List;

public interface CuentaLoginService {
  List<CuentaLoginRequest> ObtenerLogin(CuentaLoginRequest paramCuentaLoginRequest);
}
