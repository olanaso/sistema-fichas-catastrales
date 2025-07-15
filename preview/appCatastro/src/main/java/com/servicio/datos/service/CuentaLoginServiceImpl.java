package com.servicio.datos.service;

import com.servicio.datos.model.CuentaLoginRequest;
import com.servicio.datos.repository.CuentaLoginRepository;
import com.servicio.datos.service.CuentaLoginService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CuentaLoginServiceImpl implements CuentaLoginService {
  @Autowired
  private CuentaLoginRepository cuentaLoginRepository;
  
  public List<CuentaLoginRequest> ObtenerLogin(CuentaLoginRequest login) {
    return this.cuentaLoginRepository.ObtenerLogin(login);
  }
}
