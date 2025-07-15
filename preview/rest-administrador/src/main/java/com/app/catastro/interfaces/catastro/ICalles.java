package com.app.catastro.interfaces.catastro;


import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

import org.springframework.dao.DataAccessException;
import org.xml.sax.SAXException;

import com.app.catastro.master.ICRUD;
import com.app.catastro.model.calles;

public interface ICalles extends ICRUD<calles,String,String,String> {
	
	List<calles> listar_calles_x_sucursal(String codemp,String codsuc,String usuario,String password) throws DataAccessException, SAXException, IOException, ParserConfigurationException;
	
}
