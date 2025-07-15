package com.servicio.datos.model.Fcatastro;

import java.util.Date;
import java.util.List;

import lombok.Data;
@Data
public class RegistraTarifasIndividual {

	String	codemp;
	Integer	codcliente;
	Integer	item;
	Integer	procesado;
	String	fechareg;
	String tarifa;
	String actividad;
	Integer cantidad;
	String razonsocial;
	String referencia;
		 
}
