package com.servicio.datos.service.Fcatastro;

import com.servicio.datos.model.Fcatastro.*;
import com.servicio.datos.model.Fcatastro.FichaCatastralRequest;
import com.servicio.datos.model.Fcatastro.FichaCatastralResponse;
import com.servicio.datos.repository.Fcatastro.FichaCatastralRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FichaCatastralServiceImpl implements FichaCatastralService {
  @Autowired
  private FichaCatastralRepository fichaCatastralRepository;
  

/*public FichaCatastralResponse ConsultaFicha(FichaCatastralRequest fichaCatastralRequest) {
	 return this.fichaCatastralRepository.ConsultaFicha(fichaCatastralRequest);
}*/


/*@Override
public FichaCatastralResponse ConsultaFicha(int codcliente, String nrocatastro) {
	 return this.fichaCatastralRepository.ConsultaFicha(codcliente,nrocatastro);
}*/


@Override
public FichaCatastralResponse ConsultaFicha(Integer codcliente, String nrocatastro) {
	return this.fichaCatastralRepository.ConsultaFicha(codcliente,nrocatastro);
}
}
