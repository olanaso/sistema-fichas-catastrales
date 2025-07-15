package com.servicio.datos.service.Fcatastro;

import com.servicio.datos.model.Fcatastro.*;

public interface ConsultaCuscoService {
	//FichaCatastralResponse ConsultaFicha(FichaCatastralRequest fichaCatastralRequest);

	FichaCatastralCuscoResponse ConsultaFichaCusco(Integer integer, String nrocatastro);


}
