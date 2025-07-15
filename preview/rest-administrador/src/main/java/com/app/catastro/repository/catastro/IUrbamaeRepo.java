package com.app.catastro.repository.catastro;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.*;
import org.springframework.stereotype.Repository;
import org.xml.sax.SAXException;

import com.app.catastro.interfaces.catastro.IFichaCatastroMovil;
import com.app.catastro.interfaces.catastro.IUrbamae;
import com.app.catastro.master.IGenericRepo;
import com.app.catastro.model.urbamae;
import com.app.catastro.model.catastro.AsignacionFicha;
import com.app.catastro.model.catastro.ReportFichaMovil;
import com.app.catastro.model.catastro.ReportFichaMovilCusco;
import com.app.catastro.model.catastro.TarifasApp;
import com.app.catastro.model.catastro.fichaCatrastroMovil;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.ParserConfigurationException;

@Repository
public class IUrbamaeRepo  extends IGenericRepo implements IUrbamae {

	@Override
	public List<urbamae> listar(String user, String pass)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String crud(urbamae obj, int op, String user, String pass)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public urbamae buscar(String codemp, String codsuc, String codigo, String user, String pass)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public List<urbamae> drop_urba_x_suc(String codemp, String codsuc, String usuario, String password)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		String query = "SELECT * FROM fichacatastral.urbanmae where codemp='"+codemp+"' and codsuc='"+codsuc+"' and estareg=1 order by codurbaso ";
		return this.jTemplateCatastro(usuario,password).query(query, 
													  new BeanPropertyRowMapper<urbamae>(urbamae.class));

	}
	
}


  
