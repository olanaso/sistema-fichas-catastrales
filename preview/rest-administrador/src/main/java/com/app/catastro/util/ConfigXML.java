package com.app.catastro.util;

import java.io.IOException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import com.app.catastro.model.utils.config;



@Service
public class ConfigXML {
  public config getXML() throws SAXException, IOException, ParserConfigurationException {
    DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
    DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
    String pathPDF = "";
    String clas,clas1,urlBD,urlBD1,urlBD2,puerto;
	

	  pathPDF	= "";
	  
	  clas		= "net.sourceforge.jtds.jdbc.Driver";
	  clas1		="org.postgresql.Driver";
	  
	  urlBD = ""; 
	  urlBD2 = "jdbc:postgresql://161.132.56.57:8432/sedacusco";
	  urlBD1 = "jdbc:postgresql://localhost:5432/ficha";
	  puerto	= "5000";
	 
	  return new config(pathPDF,clas,clas1,urlBD,urlBD1,urlBD2,puerto);	

	  
}
}
