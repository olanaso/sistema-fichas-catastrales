package com.servicio.datos.service.Fcatastro;

import com.servicio.datos.model.Fcatastro.ConsultaRequest;
import com.servicio.datos.model.Fcatastro.ConsultaResponse;
import com.servicio.datos.repository.Fcatastro.ConsultaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConsultaServiceImpl implements ConsultaService {
  @Autowired
  private ConsultaRepository consultaRepository;
  
  /*public ViewMailSolResponse ViewObsv(ViewMailSolRequest viewObsv) {
    return this.viewObsvSolWebRepository.CorrigeSolconx(viewObsv);
  }*/

public ConsultaResponse ConsultaCliente(ConsultaRequest consultaRequest) {
	 return this.consultaRepository.ConsultaCliente(consultaRequest);
}
}
