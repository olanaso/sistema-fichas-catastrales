package com.servicio.datos.service.Fcatastro;

import com.servicio.datos.model.Fcatastro.*;
import com.servicio.datos.repository.Fcatastro.ConsultaCuscoRepository;
import com.servicio.datos.repository.Fcatastro.FichaCatastralRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConsultaCuscoServiceImpl implements ConsultaCuscoService {
  @Autowired
  private ConsultaCuscoRepository consultaCuscoRepository;
  

@Override
public FichaCatastralCuscoResponse ConsultaFichaCusco(Integer codcliente, String nrocatastro) {
	
	return this.consultaCuscoRepository.ConsultaFichaCusco(codcliente,nrocatastro);
}
}
