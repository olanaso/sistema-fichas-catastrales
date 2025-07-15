package com.servicio.datos.model;

import java.util.List;

//import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Component;


/**
 * Esta clase contiene los atributos y métodos del mensaje a enviar.
 * A traves del ConfigurationProperties se indica el patron que ayudará
 * a obtener los valores desde el properties de configuración.
 * @author Lizandro Alipazaga
 */
@Component
public class Mensaje{
	private CuentaMensaje cuentaRemitente;
	
	//@NotNull(message="{validacion.mensaje.cuentaDestino.NotNull}")
	private CuentaMensaje cuentaDestino;
	
	private List<CuentaMensaje> cuentaCopia;
	
	private List<CuentaMensaje> cuentaOculta;

	private CuentaMensaje cuentaRespuesta;
	
	//@NotNull(message = "{validacion.mensaje.mensajeAsunto.NotNull}")
	private String mensajeAsunto;
	
	//@NotNull(message = "{validacion.mensaje.mensajeContenido.NotNull}")
	private String mensajeContenido;
	
	private List<FileAdjunto> mensajeFileAdjunto;
	
	private boolean configSiHtml;
	
	//@NotNull(message="{validacion.mensaje.applicacionEnvio.NotNull}")
	private String aplicacionEnvio;
	
	/**
	 * Método que obtiene la cuenta de correo del usuario remitente.
	 * @return Regresa un String con la cuenta de correo del usuario remitente.
	 * @since Si su valor es null se toma por defecto el valor configurado en el properties.
	 */
	public CuentaMensaje getCuentaRemitente() {
		return cuentaRemitente;
	}
	
	/**
	 * Método que establece la cuenta de correo del usuario remitente.
	 * @param cuentaRemitente Indica la cuenta de correo del usuario remitente.
	 */
	public void setCuentaRemitente(CuentaMensaje cuentaRemitente) {
		this.cuentaRemitente = cuentaRemitente;
	}
	
	/**
	 * Método que obtiene la cuenta de correo del destinatario.
	 * @return Regresa un String con la cuenta de correo del destinatario.
	 */
	public CuentaMensaje getCuentaDestino() {
		return cuentaDestino;
	}
	
	/**
	 * Método que establece la cuenta de correo del destinatario.
	 * @param cuentaDestino Indica la cuenta de correo del destinatario.
	 */
	public void setCuentaDestino(CuentaMensaje cuentaDestino) {
		this.cuentaDestino = cuentaDestino;
	}
	
	/**
	 * Método que obtiene las cuentas de correo a los que se les enviará una 
	 * copia del mensaje.
	 * @return Regresa un String con las cuentas de correo a copiar
	 * @since "cuenta1, cuenta2, cuenta3 ..."
	 */
	public List<CuentaMensaje> getCuentaCopia() {
		return cuentaCopia;
	}
	
	/**
	 * Método que establece las cuentas de correo a los que se le enviará una
	 * copia del mensaje.
	 * @param cuentaCopia Indica las cuentas de correo a copiar
	 * @since "cuenta1, cuenta2, cuenta3 ..."
	 */
	public void setCuentaCopia(List<CuentaMensaje> cuentaCopia) {
		this.cuentaCopia = cuentaCopia;
	}
	public List<CuentaMensaje> getCuentaOculta() {
		return cuentaOculta;
	}

	public void setCuentaOculta(List<CuentaMensaje> cuentaOculta) {
		this.cuentaOculta = cuentaOculta;
	}
	public CuentaMensaje getCuentaRespuesta() {
		return cuentaRespuesta;
	}

	public void setCuentaRespuesta(CuentaMensaje cuentaRespuesta) {
		this.cuentaRespuesta = cuentaRespuesta;
	}

	/**
	 * Método que obtiene el asunto del mensaje a enviar.
	 * @return Regresa un String con el asunto del mensaje
	 */
	public String getMensajeAsunto() {
		return mensajeAsunto;
	}
	
	/**
	 * Método que establece el asunto del mensaje a enviar.
	 * @param mensajeAsunto Indica el asunto del mensaje.
	 */
	public void setMensajeAsunto(String mensajeAsunto) {
		this.mensajeAsunto = mensajeAsunto;
	}
	
	/**
	 * Método que obtiene el cuerpo o contenido del mensaje a enviar.
	 * @return Regresa un String con el cuerpo o contenido del mensaje.
	 */
	public String getMensajeContenido() {
		return mensajeContenido;
	}
	
	/**
	 * Método que establece el cuerpo o contenido del mensaje a enviar.
	 * @param mensajeContenido Indica el cuerpo o contenido del mensaje.
	 */
	public void setMensajeContenido(String mensajeContenido) {
		this.mensajeContenido = mensajeContenido;
	}
	
	/**
	 * Método que obtiene el archivo adjunto del mensaje a enviar.
	 * @return Regresa un String con el archivo adjunto del mensaje.
	 * en formato base64
	 */
	public List<FileAdjunto> getMensajeFileAdjunto() {
		return mensajeFileAdjunto;
	}
	
	/**
	 * Método que asigna el archivo adjunto del mensaje a enviar.
	 * @param mensajeFileAdjunto Indica el archivo adjunto del mensaje
	 * en formato base64
	 */
	public void setMensajeFileAdjunto(List<FileAdjunto> mensajeFileAdjunto) {
		this.mensajeFileAdjunto = mensajeFileAdjunto;
	}

	/**
	 * Método que identifica si el mensaje será enviado como HTML
	 * @return Regresa un boolean
	 */
	public boolean getConfigSiHtml() {
		return configSiHtml;
	}

	/**
	 * Método que determina si el mensaje será enviado como HTML
	 * @param configSiHtml Indica si el mensaje será enviado como HTML
	 */
	public void setConfigSiHtml(boolean configSiHtml) {
		this.configSiHtml = configSiHtml;
	}

	public String getAplicacionEnvio() {
		return aplicacionEnvio;
	}

	public void setAplicacionEnvio(String aplicacionEnvio) {
		this.aplicacionEnvio = aplicacionEnvio;
	}
}