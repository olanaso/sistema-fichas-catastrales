package com.app.catastro.service.catastro;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import com.app.catastro.interfaces.catastro.ICalles;
import com.app.catastro.repository.catastro.CallesRepo;
import com.app.catastro.model.calles;

import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

@Service
public class SCalles implements ICalles {
	@Autowired
	private CallesRepo calles;

	@Override
	public List<calles> listar(String user, String pass)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String crud(calles obj, int op, String user, String pass)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public calles buscar(String codemp, String codsuc, String codigo, String user, String pass)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<calles> listar_calles_x_sucursal(String codemp, String codsuc, String usuario, String password)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		return calles.listar_calles_x_sucursal(codemp, codsuc, usuario, password);

	}




   
	
    
}
