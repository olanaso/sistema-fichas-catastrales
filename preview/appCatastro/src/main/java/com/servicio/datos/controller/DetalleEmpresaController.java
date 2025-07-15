package com.servicio.datos.controller;


import com.servicio.datos.exception.DAOException;
import com.servicio.datos.exception.ServiceException;
import com.servicio.datos.model.ActividadResponse;
import com.servicio.datos.model.CalleRequest;
import com.servicio.datos.model.CalleResponse;
import com.servicio.datos.model.ClienteRequest;
import com.servicio.datos.model.ClienteResponse;
import com.servicio.datos.model.EmpresasRequest;
import com.servicio.datos.model.EmpresasResponse;
import com.servicio.datos.model.InspectoresRequest;
import com.servicio.datos.model.InspectoresResponse;
import com.servicio.datos.model.SedeOperacionalRequest;
import com.servicio.datos.model.SedeOperacionalResponse;
import com.servicio.datos.model.UrbanizacionResponse;
import com.servicio.datos.model.UrbanizacionVO;
import com.servicio.datos.service.ActividadService;
import com.servicio.datos.service.CalleService;
import com.servicio.datos.service.ClienteService;
import com.servicio.datos.service.EmpresasService;
import com.servicio.datos.service.InspectoresService;
import com.servicio.datos.service.SedeOperacionalService;
import com.servicio.datos.service.TokenService;
import com.servicio.datos.service.UrbanizacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DetalleEmpresaController {
  @Value("${config.tiempo.token}")
  private String tiempoToken;
  
  @Autowired
  private TokenService tokenService;

  @Autowired
  private UrbanizacionService urbanizacionService;
  
  @Autowired
  private CalleService calleService;
  
  @Autowired
  private InspectoresService inspectoresService;
  
  @Autowired
  private EmpresasService empresasService;
  
  @Autowired
  private SedeOperacionalService sedeOperacionalService;
  
  @Autowired
  private ActividadService actividadService;
  
  @Autowired
  private ClienteService clienteService;
  
  
  
  @PostMapping({"datos/codsuc/codurb"})
	  public UrbanizacionResponse obtenerUrbanizacion(@RequestBody UrbanizacionVO urbanizacionVO) throws DAOException, ServiceException {
	    UrbanizacionResponse urbanizacionResponse = new UrbanizacionResponse();
	    boolean esValido = true;
	    if (urbanizacionVO.getToken() == null || urbanizacionVO.getToken().isEmpty()) {
	      urbanizacionResponse.setMensaje("Parametros incorrectos");
	      urbanizacionResponse.setCodigo("2");
	      urbanizacionResponse.setSuccess(false);
	      return urbanizacionResponse;
	    } 
	    try {
	      esValido = this.tokenService.buscarTokenValido(urbanizacionVO.getToken(), Integer.valueOf(Integer.parseInt("72006767")));
	    } catch (Exception e) {
	      urbanizacionResponse.setMensaje("Por favor comunicarse con Soporte y notificar codigo de error");
	      urbanizacionResponse.setCodigo("6");
	      urbanizacionResponse.setSuccess(false);
	      return urbanizacionResponse;
	    } 
	    if (esValido) {
	      urbanizacionResponse.setListaUrbanizacion(this.urbanizacionService.ObtenerUrbanizacion(urbanizacionVO));
	      boolean success = false;
	      if (urbanizacionResponse.getListaUrbanizacion() != null && urbanizacionResponse.getListaUrbanizacion().size() > 0) {
	        String codigoRespuesta = ((UrbanizacionVO)urbanizacionResponse.getListaUrbanizacion().get(0)).getCodsuc();
	        if (codigoRespuesta != "0")
	          success = true; 
	      } 
	      urbanizacionResponse.setSuccess(success);
	      return urbanizacionResponse;
	    } 
	    urbanizacionResponse.setMensaje("No Autenticado");
	    urbanizacionResponse.setCodigo("5");
	    urbanizacionResponse.setSuccess(false);
	    return urbanizacionResponse;
	  }
  
  @PostMapping({"datos/codsuc/codcalle"})
	  public CalleResponse calles(@RequestBody CalleRequest calleRequest) throws DAOException, ServiceException {
	    CalleResponse calleResponse = new CalleResponse();
	    boolean esValido = true;
	    if (calleRequest.getToken() == null || calleRequest.getToken().isEmpty()) {
	      calleResponse.setMensaje("Parametros incorrectos");
	      calleResponse.setCodigo("2");
	      calleResponse.setSuccess(false);
	      return calleResponse;
	    } 
	    try {
	      esValido = this.tokenService.buscarTokenValido(calleRequest.getToken(), Integer.valueOf(Integer.parseInt("72006767")));
	    } catch (Exception e) {
	      calleResponse.setMensaje("Por favor comunicarse con Soporte y notificar codigo de error");
	      calleResponse.setCodigo("6");
	      calleResponse.setSuccess(false);
	      return calleResponse;
	    } 
	    if (esValido) {
	      calleResponse.setListaCalle(this.calleService.ObtenerCalle(calleRequest));
	      boolean success = false;
	      if (calleResponse.getListaCalle() != null && calleResponse.getListaCalle().size() > 0) {
	        String codigoRespuesta = ((CalleRequest)calleResponse.getListaCalle().get(0)).getCodsuc();
	        if (codigoRespuesta != "0")
	          success = true; 
	      } 
	      calleResponse.setSuccess(success);
	      return calleResponse;
	    } 
	    calleResponse.setMensaje("No Autenticado");
	    calleResponse.setCodigo("5");
	    calleResponse.setSuccess(false);
	    return calleResponse;
	  }
  
  
  @PostMapping({"datos/inspectores"})
	  public InspectoresResponse inspectores(@ModelAttribute InspectoresRequest inspectoresRequest) throws DAOException, ServiceException {
	    InspectoresResponse inspectoresResponse = new InspectoresResponse();
	    boolean esValido = true;
	    if (inspectoresRequest.getToken() == null || inspectoresRequest.getToken().isEmpty()) {
	      inspectoresResponse.setMensaje("Parametros incorrectos");
	      inspectoresResponse.setCodigo("2");
	      inspectoresResponse.setSuccess(false);
	      return inspectoresResponse;
	    } 
	    try {
	      esValido = this.tokenService.buscarTokenValido(inspectoresRequest.getToken(), Integer.valueOf(Integer.parseInt("1728000")));
	    } catch (Exception e) {
	      inspectoresResponse.setMensaje("Por favor comunicarse con Soporte y notificar codigo de error");
	      inspectoresResponse.setCodigo("6");
	      inspectoresResponse.setSuccess(false);
	      return inspectoresResponse;
	    } 
	    if (esValido) {
	      inspectoresResponse.setInspectores(this.inspectoresService.ObtenerInspectores(inspectoresRequest));
	      boolean success = false;
	      if (inspectoresResponse.getInspectores() != null && inspectoresResponse.getInspectores().size() > 0) {
	        String codigoRespuesta = ((InspectoresRequest)inspectoresResponse.getInspectores().get(0)).getCodemp();
	        if (codigoRespuesta != "0")
	          success = true; 
	      } 
	      inspectoresResponse.setSuccess(success);
	      return inspectoresResponse;
	    } 
	    inspectoresResponse.setMensaje("No Autenticado");
	    inspectoresResponse.setCodigo("5");
	    inspectoresResponse.setSuccess(false);
	    return inspectoresResponse;
	  }
  
  @PostMapping({"datos/empresas"})
	  public EmpresasResponse empresas(@ModelAttribute EmpresasRequest empresasRequest) throws DAOException, ServiceException {
	    EmpresasResponse empresasResponse = new EmpresasResponse();
	    boolean esValido = true;
	    if (empresasRequest.getToken() == null || empresasRequest.getToken().isEmpty()) {
	      empresasResponse.setMensaje("Parametros incorrectos");
	      empresasResponse.setCodigo("2");
	      empresasResponse.setSuccess(false);
	      return empresasResponse;
	    } 
	    try {
	      esValido = this.tokenService.buscarTokenValido(empresasRequest.getToken(), Integer.valueOf(Integer.parseInt("1728000")));
	    } catch (Exception e) {
	      empresasResponse.setMensaje("Por favor comunicarse con Soporte y notificar codigo de error");
	      empresasResponse.setCodigo("6");
	      empresasResponse.setSuccess(false);
	      return empresasResponse;
	    } 
	    if (esValido) {
	      empresasResponse.setEmpresa(this.empresasService.ObtenerEmpresas(empresasRequest));
	      boolean success = false;
	      if (empresasResponse.getEmpresa() != null && empresasResponse.getEmpresa().size() > 0) {
	        String codigoRespuesta = ((EmpresasRequest)empresasResponse.getEmpresa().get(0)).getCodemp();
	      
	        if (codigoRespuesta != "0")
	          success = true; 
	      } 
	      empresasResponse.setSuccess(success);
	      return empresasResponse;
	    } 
	    empresasResponse.setMensaje("No Autenticado");
	    empresasResponse.setCodigo("5");
	    empresasResponse.setSuccess(false);
	    return empresasResponse;
	  }
  
  @PostMapping({"datos/sedeoperacional"})
	  public SedeOperacionalResponse sedes(@ModelAttribute SedeOperacionalRequest sedeOperacionalRequest) throws DAOException, ServiceException {
	    SedeOperacionalResponse sedeOperacionalResponse = new SedeOperacionalResponse();
	    boolean esValido = true;
	    if (sedeOperacionalRequest.getToken() == null || sedeOperacionalRequest.getToken().isEmpty()) {
	      sedeOperacionalResponse.setMensaje("Parametros incorrectos");
	      sedeOperacionalResponse.setCodigo("2");
	      sedeOperacionalResponse.setSuccess(false);
	      return sedeOperacionalResponse;
	    } 
	    try {
	      esValido = this.tokenService.buscarTokenValido(sedeOperacionalRequest.getToken(), Integer.valueOf(Integer.parseInt("1728000")));
	    } catch (Exception e) {
	      sedeOperacionalResponse.setMensaje("Por favor comunicarse con Soporte y notificar codigo de error");
	      sedeOperacionalResponse.setCodigo("6");
	      sedeOperacionalResponse.setSuccess(false);
	      return sedeOperacionalResponse;
	    } 
	    if (esValido) {
	      sedeOperacionalResponse.setSede(this.sedeOperacionalService.ObtenerSedes(sedeOperacionalRequest));
	      boolean success = false;
	      if (sedeOperacionalResponse.getSede() != null && sedeOperacionalResponse.getSede().size() > 0) {
	        String codigoRespuesta = ((SedeOperacionalRequest)sedeOperacionalResponse.getSede().get(0)).getCodemp();
	        if (codigoRespuesta != "0")
	          success = true; 
	      } 
	      sedeOperacionalResponse.setSuccess(success);
	      return sedeOperacionalResponse;
	    } 
	    sedeOperacionalResponse.setMensaje("No Autenticado");
	    sedeOperacionalResponse.setCodigo("5");
	    sedeOperacionalResponse.setSuccess(false);
	    return sedeOperacionalResponse;
	  }
  
  @PostMapping({"datos/cliente"})
  public ClienteResponse cliente(@RequestBody ClienteRequest clienteRequest) throws DAOException, ServiceException {
	  
	  ClienteResponse clienteResponse = new ClienteResponse();
	    
	    boolean esValido = true;
	    if (clienteRequest.getToken() == null || clienteRequest.getToken().isEmpty()) {
	    	clienteResponse.setMensaje("Parametros incorrectos");
	    	clienteResponse.setCodigo("2");
	    	clienteResponse.setSuccess(false);
	        return clienteResponse;
	      } 
	      try {
	        esValido = this.tokenService.buscarTokenValido(clienteRequest.getToken(), Integer.valueOf(Integer.parseInt("1728000")));
	      } catch (Exception e) {
	    	  clienteResponse.setMensaje("Por favor comunicarse con Soporte y notificar codigo de error");
	    	  clienteResponse.setCodigo("6");
	    	  clienteResponse.setSuccess(false);
	        return clienteResponse;
	      } 
    if (esValido) {
    	
      boolean success = false;
      
      if (this.clienteService.ObtenerData(clienteRequest) != null ) {
  		clienteResponse=(ClienteResponse) (this.clienteService.ObtenerData(clienteRequest));
  		clienteResponse.setMensaje("");
  	    clienteResponse.setCodigo("0");
  	    clienteResponse.setSuccess(true);
  	    
        }else {
      	  clienteResponse.setMensaje("No Existe Usuario");
      	    clienteResponse.setCodigo("1");
      	    clienteResponse.setSuccess(false);
        }
      		return clienteResponse;
    	}
    clienteResponse.setMensaje("No Autenticado");
    clienteResponse.setCodigo("5");
    clienteResponse.setSuccess(false);
    return clienteResponse;
  }
  
  
  @PostMapping({"datos/actividad"})
  
  
  public ActividadResponse actividad() throws DAOException, ServiceException {
	  
	  ActividadResponse actividadResponse = new ActividadResponse();

		    boolean esValido = true;
		    try {
		    if (esValido) {
		    	actividadResponse.setActividad(this.actividadService.actividades());
		    	
		      boolean success = false;

			  
		      if (actividadResponse.getActividad() != null ) {
		        String codigoRespuesta = "1";
		        System.out.println("codigo Respuesta:" + codigoRespuesta);
		        if (codigoRespuesta != "0")
		          success = true; 
		      } 
		      actividadResponse.setSuccess(success);
		      return actividadResponse;
		    } 
		    actividadResponse.setMensaje("No Autenticado");
		    actividadResponse.setCodigo("5");
		    actividadResponse.setSuccess(false);
					    return actividadResponse;
			  } catch (Exception ex) {
				  actividadResponse.setMensaje("No se pudo generar reclamo");
				  actividadResponse.setCodigo("6");
				  actividadResponse.setSuccess(false);
			    return actividadResponse;
			  } 
  	}

  
}
