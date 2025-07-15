package com.servicio.datos.controller;


import com.servicio.datos.exception.DAOException;
import com.servicio.datos.exception.ServiceException;
import com.servicio.datos.model.Fcatastro.*;
import com.servicio.datos.service.Fcatastro.*;
import com.servicio.datos.service.TokenService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
public class FcatastroController {
  @Value("${config.tiempo.token}")
  private String tiempoToken;
  
  @Autowired
  private TokenService tokenService;

  @Autowired
  private ListTipoService listTipoService;
  
  @Autowired
  private listaOfflineService ListaOfflineService;

  @Autowired
  private FichaCatastralV3Service fichaCatastralV3Service;
  
  @Autowired
  private FichaCatastralMovilCuscoService fichaCatastralMovilCuscoService;
  
  
  @Autowired
  private ConsultaCuscoService consultaCuscoService;
  
 
  @PostMapping({"datos/ListTipo"})
  
  public ListTipoResponse Listado(@RequestBody ListTipoRequest listTipoRequest) throws DAOException, ServiceException {
   
	  ListTipoResponse listTipoResponse = new ListTipoResponse();
   
	  boolean esValido = true;
	    try {
	    if (esValido) {  
	     listTipoResponse.setListTipo(this.listTipoService.ListaTipos(listTipoRequest));
	    	boolean success = true;
	      if (listTipoResponse.getCodigo() != null && listTipoResponse.getListTipo().size() > 0) {
	        String codigoRespuesta = "1";
	        if (codigoRespuesta != "0")
	          success = true; 
	      } 
	      listTipoResponse.setSuccess(success);
	      return listTipoResponse;
	    } 
	    listTipoResponse.setMensaje("No Autenticado");
	    listTipoResponse.setCodigo("5");
	    listTipoResponse.setSuccess(false);
				    return listTipoResponse;
		  } catch (Exception ex) {
			  listTipoResponse.setMensaje("No se pudo generar listado");
			  listTipoResponse.setCodigo("6");
			  listTipoResponse.setSuccess(false);
		    return listTipoResponse;
		  } 
  	}  
  

  
  @PostMapping({"datos/ConsultaGeneralCusco"})
  public FichaCatastralCuscoResponse ConsultaCusco(@RequestBody ConsultaRequest consultaRequest) throws DAOException, ServiceException {
	  
	  FichaCatastralCuscoResponse fichaCatastralCuscoResponse = new FichaCatastralCuscoResponse();
	  fichaCatastralCuscoResponse=this.consultaCuscoService.ConsultaFichaCusco(consultaRequest.getCodcliente(),"1");
		     	
	  boolean success = false;

		      if (fichaCatastralCuscoResponse.getSuministro() != null ) {
		        String codigoRespuesta = "1";
		        if (codigoRespuesta != "0")
		          success = true; 
		      } 
		
		      return fichaCatastralCuscoResponse ;
		   
  	}
  
  
  @PostMapping({"datos/ConsultaGeneralV3"})
  public ConsultaFichaCatastralV2Response ConsultaCatasv3(@RequestBody ConsultaRequestV3 consultaRequestV3) throws DAOException, ServiceException {
	 
	  ConsultaFichaCatastralV2Response fichaCatastralResponse = new ConsultaFichaCatastralV2Response();
	  
		    boolean esValido = true;
		    try {   
		    if (esValido) {
		    	
		      fichaCatastralResponse=this.fichaCatastralV3Service.ConsultaFichaV3(consultaRequestV3.getValor(),consultaRequestV3.getTipo());

		      boolean success = false;

		      if (fichaCatastralResponse .getCodcliente() != null ) {
		        String codigoRespuesta = "1";
		        if (codigoRespuesta != "0")
		          success = true; 
		      } 
			    fichaCatastralResponse .setSuccess(success);
			    return fichaCatastralResponse ;
		    } 
			    fichaCatastralResponse.setMensaje("No Autenticado");
			    fichaCatastralResponse.setCodigo("5");
			    fichaCatastralResponse.setSuccess(false);
			    return fichaCatastralResponse ;
			 } catch (Exception ex) {
				  fichaCatastralResponse.setMensaje("No se pudo generar consulta");
				  fichaCatastralResponse.setCodigo("6");
				  fichaCatastralResponse.setSuccess(false);
			    return fichaCatastralResponse ;
			  } 
  	}
  

  @PostMapping({"datos/registraFichaCatastralMovilCusco"})
  public FichaCatastralMovilResponse registraFichaCusco(@RequestBody FichaCatastralMovilCuscoRequest fichaCatastralMovilCuscoRequest) throws DAOException, ServiceException {
   
	  FichaCatastralMovilResponse fichaCatastralMovilResponse = new FichaCatastralMovilResponse();
	  boolean esValido = false;
	  
	    if (fichaCatastralMovilCuscoRequest.getToken() == null || fichaCatastralMovilCuscoRequest.getToken().isEmpty()) {
	    	fichaCatastralMovilResponse.setMensaje("Parametros incorrectos");
	    	fichaCatastralMovilResponse.setCodigo("2");
	    	fichaCatastralMovilResponse.setSuccess(false);
	      return fichaCatastralMovilResponse;
	    } 
	    try {
	      esValido = this.tokenService.buscarTokenValido(fichaCatastralMovilCuscoRequest.getToken(), Integer.valueOf(Integer.parseInt("1728000")));
	      
	    } catch (Exception e) {
	    	fichaCatastralMovilResponse.setMensaje("Por favor comunicarse con Soporte y notificar codigo de error");
	    	fichaCatastralMovilResponse.setCodigo("6");
	    	fichaCatastralMovilResponse.setSuccess(false);
	      return fichaCatastralMovilResponse;
	   } 
    
	int validador=this.fichaCatastralMovilCuscoService.registraFichaCusco(fichaCatastralMovilCuscoRequest);
	
	if( validador!=0) {
		//
		fichaCatastralMovilResponse.setMensaje("Ficha Registrada");
		fichaCatastralMovilResponse.setCodigo("1");
		fichaCatastralMovilResponse.setSuccess(true);
	}else {
		fichaCatastralMovilResponse.setMensaje("No se Registro Ficha");
		fichaCatastralMovilResponse.setCodigo("5");
		fichaCatastralMovilResponse.setSuccess(false);
	}

	   return fichaCatastralMovilResponse;
  
  }
  
  
  @PostMapping({"datos/listaOffline"})
  public ListaOfflineResponse genera_lista(@ModelAttribute ListaOfflineRequest listaTipoCorteAppRequest) throws DAOException, ServiceException {
	 
	  ListaOfflineResponse listaTipoCorteAppResponse = new ListaOfflineResponse();
	  
    boolean esValido = false;
    if (listaTipoCorteAppRequest.getToken() == null || listaTipoCorteAppRequest.getToken().isEmpty()) {
    	listaTipoCorteAppResponse.setMensaje("Parametros incorrectos");
    	listaTipoCorteAppResponse.setCodigo("2");
    	listaTipoCorteAppResponse.setSuccess(false);
      return listaTipoCorteAppResponse;
    } 
    try {
      esValido = this.tokenService.buscarTokenValido(listaTipoCorteAppRequest.getToken(), Integer.valueOf(Integer.parseInt("1728000")));
    } catch (Exception e) {
    	listaTipoCorteAppResponse.setMensaje("Por favor comunicarse con Soporte y notificar codigo de error");
    	listaTipoCorteAppResponse.setCodigo("6");
    	listaTipoCorteAppResponse.setSuccess(false);
      return listaTipoCorteAppResponse;
    } 
    try {
      if (esValido) {
    	  listaTipoCorteAppResponse.setListGeneral(this.ListaOfflineService.genera_lista(listaTipoCorteAppRequest)) ;
    	  boolean success = false;
        if (listaTipoCorteAppResponse.getListGeneral()!=null &&  listaTipoCorteAppResponse.getListGeneral().size() > 0)
        	
        	
          success = true; 
        listaTipoCorteAppResponse.setSuccess(success);
        listaTipoCorteAppResponse.setCodigo("1");
        return listaTipoCorteAppResponse;
      } 
      listaTipoCorteAppResponse.setMensaje("No Autenticado");
      listaTipoCorteAppResponse.setCodigo("5");
      listaTipoCorteAppResponse.setSuccess(false);
      return listaTipoCorteAppResponse;
    } catch (Exception ex) {
    	listaTipoCorteAppResponse.setMensaje("Error en Parametros ingresados");
    	listaTipoCorteAppResponse.setCodigo("6");
    	listaTipoCorteAppResponse.setSuccess(false);
      return listaTipoCorteAppResponse;
    } 
    } 
  
  
}