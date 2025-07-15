package com.app.catastro.interfaces.catastro;

import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

import org.springframework.dao.DataAccessException;
import org.xml.sax.SAXException;

import com.app.catastro.master.ICRUD;
import com.app.catastro.model.urbamae;



public interface IUrbamae extends ICRUD<urbamae,String,String,String> {
	
	List<urbamae> drop_urba_x_suc(String codemp, String codsuc, String usuario,String password) throws DataAccessException, SAXException, IOException, ParserConfigurationException;

}
