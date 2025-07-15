package com.servicio.datos.service.Fcatastro;

import com.servicio.datos.model.Fcatastro.*;
import com.servicio.datos.repository.Fcatastro.FichaCatastralRepository;
import com.servicio.datos.repository.Fcatastro.FichaCatastralV2Repository;
import com.servicio.datos.repository.Fcatastro.FichaCatastralV3Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FichaCatastralV3ServiceImpl implements FichaCatastralV3Service {
 
	
	@Autowired
  private FichaCatastralV3Repository fichaCatastralV3Repository;

	@Override
	public ConsultaFichaCatastralV2Response ConsultaFichaV3(String valor,int tipo) {
		
		 return this.fichaCatastralV3Repository.ConsultaFichaV3(valor,tipo);
	}
  
}
