package com.app.catastro.interfaces.catastro;

import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

import org.springframework.dao.DataAccessException;
import org.xml.sax.SAXException;

import com.app.catastro.master.ICRUD;
import com.app.catastro.model.catastro.AsignacionFicha;
import com.app.catastro.model.catastro.ReportFichaMovil;
import com.app.catastro.model.catastro.ReportFichaMovilCusco;
import com.app.catastro.model.catastro.TarifasApp;
import com.app.catastro.model.catastro.excelCargaRequest;
import com.app.catastro.model.catastro.excelCargaResponse;
import com.app.catastro.model.catastro.fichaCatrastroMovil;



public interface IFichaCatastroMovil extends ICRUD<fichaCatrastroMovil,String,String,String> {
	

	List<fichaCatrastroMovil> listarImagenes(String usuario, String password, fichaCatrastroMovil ficha)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
	List<fichaCatrastroMovil> listaGeneralCusco(String usuario, String password, fichaCatrastroMovil ficha)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
	List<fichaCatrastroMovil> graficoTotalCusco(String usuario, String password, fichaCatrastroMovil ficha)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
	List<fichaCatrastroMovil> notificaciones(String usuario, String password, fichaCatrastroMovil ficha)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
	List<excelCargaResponse> reportCarga(String usuario, String password,excelCargaRequest excel)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
	List<TarifasApp> tarifasAPP(String usuario, String password,TarifasApp tarifas)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
	List<TarifasApp> tarifasPDF( String user, String pass, int idficha)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
	List<ReportFichaMovilCusco> listarReporteCusco(String usuario, String password, ReportFichaMovilCusco fichaCusco)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
	ReportFichaMovilCusco fichaCusco(int objectID,String usuario, String password)	throws DataAccessException, SAXException, IOException, ParserConfigurationException;	
	List<AsignacionFicha> listarAsignacion(String usuario, String password, AsignacionFicha asignacionficha)throws DataAccessException, SAXException, IOException, ParserConfigurationException;
	String crudapp(String json, String usuario, String password) throws DataAccessException, SAXException, IOException, ParserConfigurationException;

	
}
