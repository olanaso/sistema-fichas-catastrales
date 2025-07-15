package com.servicio.datos.service.Fcatastro;

import com.servicio.datos.model.Fcatastro.*;

public interface FichaCatastralV3Service {
	

	ConsultaFichaCatastralV2Response ConsultaFichaV3(String valor,int tipo);
}
