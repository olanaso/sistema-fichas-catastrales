package com.servicio.datos.model.Fcatastro;

import java.util.Date;
import java.util.List;

import com.servicio.datos.model.Fcatastro.FichaCatrastralMovilIndividual_old;

import lombok.Data;
@Data
public class FichaCatastralMovil2Request {

	
	private List<FichaCatrastralMovilV2Individual_old> listaFichaCatastroMovilV2;
	  
	  private String token;

		
}
