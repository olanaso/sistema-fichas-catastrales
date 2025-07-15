package com.app.catastro.service.catastro;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.xml.sax.SAXException;

import com.app.catastro.interfaces.catastro.IUrbamae;
import com.app.catastro.model.urbamae;
import com.app.catastro.repository.catastro.IUrbamaeRepo;

import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

@Service
public class SUrbamae implements IUrbamae {

    @Autowired
    private IUrbamaeRepo urbaRepo;

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
		return urbaRepo.drop_urba_x_suc(codemp, codsuc, usuario, password);
	}

	
    
}
