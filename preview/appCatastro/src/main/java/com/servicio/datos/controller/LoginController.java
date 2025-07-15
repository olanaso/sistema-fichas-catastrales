package com.servicio.datos.controller;

import com.servicio.datos.exception.DAOException;
import com.servicio.datos.exception.ServiceException;
import com.servicio.datos.model.CuentaLoginRequest;
import com.servicio.datos.model.CuentaLoginResponse;
import com.servicio.datos.model.SecureToken;
import com.servicio.datos.model.Usuario;
import com.servicio.datos.model.UsuarioResponse;
import com.servicio.datos.service.CuentaLoginService;
import com.servicio.datos.service.LoginService;
import com.servicio.datos.service.TokenService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
  
  @Autowired
  private LoginService loginService;
  
  @Autowired
  private TokenService tokenService;
  
  @Autowired
  private CuentaLoginService cuentaLoginService;
  

  @PostMapping({"datos/loginM"})
	  public UsuarioResponse obtenerLogin1(@ModelAttribute Usuario usuario) throws Exception {
	    UsuarioResponse usuarioR = new UsuarioResponse();
	    List<UsuarioResponse> listaUsuario = this.loginService.ObtenerUsuario(usuario);
	    if (listaUsuario != null && listaUsuario.size() > 0) {
	      usuarioR = listaUsuario.get(0);
	      usuarioR.setSuccess(true);
	      SecureToken st = new SecureToken();
	      String stoken = st.generateToken(usuario.getUsuario());
	      usuarioR.setToken(stoken);
	      try {
	        this.tokenService.registrarToken(stoken);
	      } catch (Exception e) {
	        usuarioR = new UsuarioResponse();
	        usuarioR.setSuccess(false);
	        usuarioR.setMensaje("Error al generar token");
	        return usuarioR;
	      } 
	    } else {
	      usuarioR.setMensaje("Usuario no encontrado");
	      usuarioR.setSuccess(false);
	    } 
	    return usuarioR;
	  }
  
  @PostMapping({"datos/cuentaLogin"})
	  public CuentaLoginResponse login(@ModelAttribute CuentaLoginRequest cuentaLoginRequest) throws DAOException, ServiceException {
	    CuentaLoginResponse cuentaLoginResponse = new CuentaLoginResponse();
	    boolean esValido = true;
	    if (cuentaLoginRequest.getToken() == null || cuentaLoginRequest.getToken().isEmpty()) {
	      cuentaLoginResponse.setMensaje("Parametros incorrectos");
	      cuentaLoginResponse.setCodigo("2");
	      cuentaLoginResponse.setSuccess(false);
	      return cuentaLoginResponse;
	    } 
	    try {
	      esValido = this.tokenService.buscarTokenValido(cuentaLoginRequest.getToken(), Integer.valueOf(Integer.parseInt("1728000")));
	    } catch (Exception e) {
	      cuentaLoginResponse.setMensaje("Por favor comunicarse con Soporte y notificar codigo de error");
	      cuentaLoginResponse.setCodigo("6");
	      cuentaLoginResponse.setSuccess(false);
	      return cuentaLoginResponse;
	    } 
	    if (esValido) {
	      cuentaLoginResponse.setLogin(this.cuentaLoginService.ObtenerLogin(cuentaLoginRequest));
	      boolean success = false;
	      if (cuentaLoginResponse.getLogin() != null && cuentaLoginResponse.getLogin().size() > 0) {
	        String codigoRespuesta = ((CuentaLoginRequest)cuentaLoginResponse.getLogin().get(0)).getCodemp();
	        if (codigoRespuesta != "0")
	          success = true; 
	      } 
	      cuentaLoginResponse.setSuccess(success);
	      return cuentaLoginResponse;
	    } 
	    cuentaLoginResponse.setMensaje("No Autenticado");
	    cuentaLoginResponse.setCodigo("5");
	    cuentaLoginResponse.setSuccess(false);
	    return cuentaLoginResponse;
	  }
 
  
}
