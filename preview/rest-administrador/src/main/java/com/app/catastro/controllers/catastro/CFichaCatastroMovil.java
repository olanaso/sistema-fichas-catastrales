package com.app.catastro.controllers.catastro;

import com.app.catastro.model.catastro.AsignacionFicha;
import com.app.catastro.model.catastro.ReportFichaMovilCusco;
import com.app.catastro.model.catastro.TarifasApp;
import com.app.catastro.model.catastro.excelCargaRequest;
import com.app.catastro.model.catastro.excelCargaResponse;
import com.app.catastro.model.catastro.fichaCatrastroMovil;
import com.app.catastro.service.catastro.SFichaCatastroMovil;
import com.app.catastro.util.RespuestasJsonUtil;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.google.gson.Gson;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xml.sax.SAXException;

@RestController
@RequestMapping("/fichaCatastroMovil")

public class CFichaCatastroMovil {

    @Autowired
    private SFichaCatastroMovil sFichaCatastroMovil;
    
	String usuario="INSWEB";
	String password="juli0ces@r";


    @GetMapping("/listar")
    public String listarMuestras() throws DataAccessException, JSONException, SAXException, IOException, ParserConfigurationException {
    	
      return null;

     }
    

    @PostMapping("/{op}")
    @ResponseBody
    public String crudSolicitudes(@RequestBody fichaCatrastroMovil sol, @PathVariable int op) throws DataAccessException, JSONException, SAXException, IOException, ParserConfigurationException {
        RespuestasJsonUtil respuesta = new RespuestasJsonUtil();
        JSONObject json = new JSONObject();
        Gson gson = new Gson();       
        return respuesta.devolverRespuesta(json, gson.toJson(this.sFichaCatastroMovil.crud(sol, op,usuario, password)));
    }
    
    @PostMapping("/crudpsql")
    public String ejecutarFuncionFicha(@RequestBody String jsonData) throws DataAccessException, SAXException, IOException, ParserConfigurationException {
        
         
    	  RespuestasJsonUtil respuesta = new RespuestasJsonUtil();
          JSONObject json = new JSONObject();
          Gson gson = new Gson();

         
          return respuesta.devolverRespuesta(json, gson.toJson(this.sFichaCatastroMovil.crudapp(jsonData, usuario, password)));

     
    }
    
    @PostMapping("GestionTarifas/{op}")
    @ResponseBody
    public String crudCassetes(@RequestBody List<TarifasApp>  tarifas, @PathVariable int op) throws DataAccessException, JSONException, SAXException, IOException, ParserConfigurationException {
        RespuestasJsonUtil respuesta = new RespuestasJsonUtil();
        JSONObject json = new JSONObject();
        Gson gson = new Gson();
        String gen="";

        
        for (TarifasApp rows : tarifas) {
        	TarifasApp dat = new TarifasApp();
        	
        	dat.setCodemp(rows.getCodemp());
        	dat.setCodcliente(rows.getCodcliente());
        	dat.setTarifa(rows.getTarifa());
        	dat.setActividad(rows.getActividad());
        	dat.setRazonsocial(rows.getRazonsocial());
        	dat.setReferencia(rows.getReferencia());
        	dat.setIdficha(rows.getIdficha());
        	
        	
        	gen=this.sFichaCatastroMovil.crudTarifas(dat, op, usuario, password);
        }
        
       
        return respuesta.devolverRespuesta(json, gson.toJson(gen));
    }
    
    
    @PostMapping("/listarTarifasAPP")
	public @ResponseBody List<TarifasApp> listaTarifasApp(@RequestBody TarifasApp tarifaModel) throws Exception{
    	  
		return sFichaCatastroMovil.tarifasAPP(usuario, password,tarifaModel);
    }
    
    @PostMapping("/listaGeneralCusco")
   	public @ResponseBody List<fichaCatrastroMovil> listaGeneralCusco(@RequestBody fichaCatrastroMovil tarifaModel) throws Exception{
       
   		return sFichaCatastroMovil.listaGeneralCusco(usuario, password,tarifaModel);
       }
   	
    @PostMapping("/GraficoTotalCusco")
   	public @ResponseBody List<fichaCatrastroMovil> graficoTotalCusco(@RequestBody fichaCatrastroMovil tarifaModel) throws Exception{
       	 
   		return sFichaCatastroMovil.graficoTotalCusco(usuario, password,tarifaModel);
       }
   	
   	@PostMapping("/listaReportCusco")
   	public @ResponseBody List<ReportFichaMovilCusco> listaReporteCusco(@RequestBody ReportFichaMovilCusco tarifaModel) throws Exception{
       	  
   		return sFichaCatastroMovil.listarReporteCusco(usuario, password,tarifaModel);
       }
   	
	@PostMapping("/searchImg")
   	public @ResponseBody List<fichaCatrastroMovil> searchImg(@RequestBody fichaCatrastroMovil tarifaModel) throws Exception{
     
   		return sFichaCatastroMovil.listarImagenes(usuario, password,tarifaModel);
       }

	
	@PostMapping("/ReporteCargaExcel")
   	public @ResponseBody List<excelCargaResponse> Carga(@RequestBody excelCargaRequest excelRequest) throws Exception{
   		return sFichaCatastroMovil.reportCarga(usuario, password,excelRequest);
       }
   	
   	@PostMapping("/Notificaciones")
   	public @ResponseBody List<fichaCatrastroMovil> Notificaciones(@RequestBody fichaCatrastroMovil graficoModel) throws Exception{
       	 
   		return sFichaCatastroMovil.notificaciones(usuario, password,graficoModel);
       }
   	
   	@PostMapping("/listarAsignacion")
   	public @ResponseBody List<AsignacionFicha> listaAsignacion(@RequestBody AsignacionFicha asignacionModel) throws Exception{
       	
   		return sFichaCatastroMovil.listarAsignacion(usuario, password,asignacionModel);
       }
}
