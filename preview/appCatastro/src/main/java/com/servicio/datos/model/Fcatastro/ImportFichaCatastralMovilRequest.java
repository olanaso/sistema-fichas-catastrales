package com.servicio.datos.model.Fcatastro;

import java.util.Date;
import java.util.List;

import com.servicio.datos.model.Fcatastro.FichaCatrastralMovilIndividual_old;

import lombok.Data;
@Data
public class ImportFichaCatastralMovilRequest {

	
	private List<FichaCatrastralMovilIndividual> listaImportFichaCatastroMovil;
	  
	  private String token;

		
}
