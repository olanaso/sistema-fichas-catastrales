package com.servicio.datos.model.Fcatastro;

import java.util.Date;
import java.util.List;

import com.servicio.datos.model.Fcatastro.FichaCatrastralMovilIndividual_old;

import lombok.Data;
@Data
public class FichaCatastralMovilRequest {

	
	private List<FichaCatrastralMovilIndividual_old> listaFichaCatastroMovil;
	  
	  private String token;

		
}
