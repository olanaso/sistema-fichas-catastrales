package com.app.catastro.master;

import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

import org.springframework.dao.DataAccessException;
import org.xml.sax.SAXException;

public interface ICRUDB<T, VCODEMP, VCODSUC, VID> {
    List<T> listar(String user, String pass, VCODEMP codemp, VCODSUC codsuc)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
    String crud(T obj, int op, String user, String pass)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
    T buscar_x_id(VCODEMP codemp, VCODSUC codsuc, VID id, String user, String pass)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
}
