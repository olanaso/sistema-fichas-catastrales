package com.app.catastro.service.catastro;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.xml.sax.SAXException;


import com.app.catastro.interfaces.catastro.IFichaCatastroMovil;
import com.app.catastro.model.catastro.AsignacionFicha;
import com.app.catastro.model.catastro.ReportFichaMovilCusco;
import com.app.catastro.model.catastro.TarifasApp;
import com.app.catastro.model.catastro.excelCargaRequest;
import com.app.catastro.model.catastro.excelCargaResponse;
import com.app.catastro.model.catastro.fichaCatrastroMovil;
import com.app.catastro.repository.catastro.IFichaCatrastroMovilRepo;

import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

@Service
public class SFichaCatastroMovil implements IFichaCatastroMovil {

    @Autowired
    private IFichaCatrastroMovilRepo appRepo;

	@Override
	public List<fichaCatrastroMovil> listar(String user, String pass)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public String crudapp(String json, String user, String pass)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		
		return this.appRepo.crudapp(json, user, pass);
	}  
	

	@Override
	public String crud(fichaCatrastroMovil obj, int op, String user, String pass)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		
		 return this.appRepo.crud(obj, op, user, pass);
	}

	@Override
	public fichaCatrastroMovil buscar(String codemp, String codsuc, String codigo, String user, String pass)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public List<fichaCatrastroMovil> listarImagenes(String usuario, String password, fichaCatrastroMovil ficha)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		  return this.appRepo.listarImagenes(usuario, password,ficha);
	}


	@Override
	public List<fichaCatrastroMovil> listaGeneralCusco(String usuario, String password, fichaCatrastroMovil ficha)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		  return this.appRepo.listaGeneralCusco(usuario, password,ficha);
	}

	@Override
	public List<fichaCatrastroMovil> graficoTotalCusco(String usuario, String password, fichaCatrastroMovil ficha)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		  return this.appRepo.graficoTotalCusco(usuario, password,ficha);
	}

	@Override
	public List<fichaCatrastroMovil> notificaciones(String usuario, String password, fichaCatrastroMovil ficha)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		  return this.appRepo.notificaciones(usuario, password,ficha);
	}

	@Override
	public List<TarifasApp> tarifasAPP(String usuario, String password, TarifasApp tarifas)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		  return this.appRepo.tarifasAPP(usuario, password,tarifas);
	}

	@Override
	public List<TarifasApp> tarifasPDF(String user, String pass, int idficha)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		 return this.appRepo.tarifasPDF(user, pass,idficha);
	}


	@Override
	public List<ReportFichaMovilCusco> listarReporteCusco(String usuario, String password,
			ReportFichaMovilCusco fichaCusco)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		 return this.appRepo.listarReporteCusco(usuario, password,fichaCusco);
	}

	@Override
	public ReportFichaMovilCusco fichaCusco(int objectID, String usuario, String password)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		return this.appRepo.fichaCusco(objectID, usuario, password);
	}

	@Override
	public List<AsignacionFicha> listarAsignacion(String usuario, String password, AsignacionFicha asignacionficha)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		return this.appRepo.listarAsignacion(usuario, password,asignacionficha);
	}

	@Override
	public List<excelCargaResponse> reportCarga(String usuario, String password, excelCargaRequest excel)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		return this.appRepo.reportCarga(usuario, password, excel);

    
	}
	
	public String crudTarifas(TarifasApp obj, int op, String user, String pass) throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		return this.appRepo.crudTarifas(obj, op, user, pass);
    }

	  
}
