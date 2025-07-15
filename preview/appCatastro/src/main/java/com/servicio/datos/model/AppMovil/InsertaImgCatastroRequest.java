package com.servicio.datos.model.AppMovil;
import java.util.List;

import lombok.Data;
@Data
public class InsertaImgCatastroRequest {
	
	  private List<InsertaImgCatastroIndividual> insertImg;
	  
	  private String token;
}
