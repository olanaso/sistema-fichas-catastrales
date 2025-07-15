package com.app.catastro.master;

import java.io.IOException;

import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.xml.sax.SAXException;

import com.app.catastro.config.WebConfig;



public class IGenericRepo {
	@Autowired
	private WebConfig db;
		
		
	public JdbcTemplate jTemplateCatastro(String usuario,String password) throws SAXException, IOException, ParserConfigurationException {
		return new JdbcTemplate(db.masterDataSourcePsql(usuario, password));
	}
}
