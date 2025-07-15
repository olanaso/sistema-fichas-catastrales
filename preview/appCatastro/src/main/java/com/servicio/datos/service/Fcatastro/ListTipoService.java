package com.servicio.datos.service.Fcatastro;



import java.util.List;

import com.servicio.datos.model.Fcatastro.ListTipoRequest;

public interface ListTipoService {
	List<ListTipoRequest> ListaTipos(ListTipoRequest listTipoRequest);
}
