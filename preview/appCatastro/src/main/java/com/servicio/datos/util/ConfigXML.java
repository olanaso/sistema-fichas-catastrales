package com.servicio.datos.util;

import com.servicio.datos.model.config;
import java.io.IOException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

@Service
public class ConfigXML {
  public config getXML() throws SAXException, IOException, ParserConfigurationException { 
    String pathPDF = "";
    String clas = "org.postgresql.Driver";
	//String urlBD = "jdbc:postgresql://161.132.56.57:8432/sedacusco";
    String urlBD = "jdbc:postgresql://localhost:5432/ficha";
    String puerto = "5000";
    return new config(pathPDF, clas, urlBD, puerto);
  }
}
