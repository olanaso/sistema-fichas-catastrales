package com.servicio.datos.service.Fcatastro;

import com.servicio.datos.model.Fcatastro.*;
import com.servicio.datos.repository.Fcatastro.FichaCatastralRepository;
import com.servicio.datos.repository.Fcatastro.FichaCatastralV2Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FichaCatastralV2ServiceImpl implements FichaCatastralV2Service {
 
	
	@Autowired
  private FichaCatastralV2Repository fichaCatastralV2Repository;

	@Override
	public ConsultaFichaCatastralV2Response ConsultaFichaV2(int codcliente) {
		
		 return this.fichaCatastralV2Repository.ConsultaFichaV2(codcliente);
	}
  



/*@Override
public FichaCatastralResponse ConsultaFicha(String codcliente, String nrocatastro) {
	 return this.fichaCatastralRepository.ConsultaFicha(codcliente,nrocatastro);
}*/
}
