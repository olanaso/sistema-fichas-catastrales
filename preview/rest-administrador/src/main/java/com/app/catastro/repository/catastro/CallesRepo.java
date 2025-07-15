package com.app.catastro.repository.catastro;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.*;
import org.springframework.stereotype.Repository;
import org.xml.sax.SAXException;

import com.app.catastro.interfaces.catastro.ICalles;
import com.app.catastro.master.IGenericRepo;
import com.app.catastro.model.calles;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.ParserConfigurationException;

@Repository
public class CallesRepo  extends IGenericRepo implements ICalles {

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
		String query = "SELECT c.codemp,c.codsuc,c.codcalle,tc.descripcioncorta AS tipocalle,c.descripcioncalle,c.estareg "
				   + "FROM fichacatastral.calles AS c "
				   + "JOIN fichacatastral.tipocalle AS tc ON tc.tipocalle = c.tipocalle "
				   + "WHERE c.codemp = ? AND c.codsuc = ? AND c.estareg=1";
	return this.jTemplateCatastro(usuario, password).query(query, new BeanPropertyRowMapper<calles>(calles.class),codemp,codsuc);
	}


    
}
