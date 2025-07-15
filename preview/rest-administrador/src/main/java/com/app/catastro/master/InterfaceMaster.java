package com.app.catastro.master;

import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

import org.springframework.dao.DataAccessException;
import org.xml.sax.SAXException;

public interface InterfaceMaster<T, VCODEMP, VCODSUC, VID> {
    List<T> listar()throws DataAccessException, SAXException, IOException, ParserConfigurationException;
    String crud(T obj,int op)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
    T buscar_x_id(VCODEMP codemp,VCODSUC codsuc,VID id)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
}
