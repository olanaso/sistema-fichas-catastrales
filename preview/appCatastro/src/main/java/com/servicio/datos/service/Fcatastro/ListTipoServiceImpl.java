package com.servicio.datos.service.Fcatastro;


import com.servicio.datos.model.Fcatastro.ListTipoRequest;
import com.servicio.datos.model.Fcatastro.ListTipoResponse;
import com.servicio.datos.repository.Fcatastro.ListTipoRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListTipoServiceImpl implements ListTipoService {
  @Autowired
  private ListTipoRepository listTipoRepository;

@Override
public List<ListTipoRequest> ListaTipos(ListTipoRequest listTipoRequest) {
	// TODO Auto-generated method stub
	return this.listTipoRepository.ObtenerList(listTipoRequest);
	
}

}

  