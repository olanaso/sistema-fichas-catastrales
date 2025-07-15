package com.servicio.datos.service;

import com.servicio.datos.model.ActividadRequest;
import com.servicio.datos.model.ActividadResponse;
import com.servicio.datos.repository.ActividadRepository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActividadServiceImpl implements ActividadService {


	@Autowired
	  private ActividadRepository actividadRepository; 
	
@Override
public List<ActividadRequest>actividades() {
	 return this.actividadRepository.actividadRep();
}
}
