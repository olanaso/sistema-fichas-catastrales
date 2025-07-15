package com.servicio.datos.rowmapper.Fcatastro;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import com.servicio.datos.model.Fcatastro.FichaCatastralResponse;

public class FichaCatastralRowMaper implements RowMapper {
	
	public FichaCatastralResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		  
		FichaCatastralResponse fichaCatastralResponse = new FichaCatastralResponse();
		  
		//fichaCatastralResponse.setCodemp(rs.getString("codemp"));
		fichaCatastralResponse.setCodsuc(rs.getString("codsuc")); 
		fichaCatastralResponse.setCodcliente(rs.getString("codcliente")); 
		fichaCatastralResponse.setEstadoservicio(rs.getString("estadoservicio")); 
		fichaCatastralResponse.setCodmza(rs.getString("codmza")); 
		fichaCatastralResponse.setNrolote(rs.getString("nrolote")); 
		fichaCatastralResponse.setNrosublote(rs.getString("nrosublote")); 
		fichaCatastralResponse.setReferencia(rs.getString("referencia")); 
		fichaCatastralResponse.setUrbanizacion(rs.getString("urbanizacion")); 
		fichaCatastralResponse.setTiposervicio(rs.getString("tiposervicio")); 
		fichaCatastralResponse.setTipousuario(rs.getString("tipousuario")); 
		fichaCatastralResponse.setPropietario(rs.getString("propietario")); 
		fichaCatastralResponse.setDireccion(rs.getString("direccion")); 
		fichaCatastralResponse.setCoddiametro_a(rs.getString("coddiametro_a")); 
		fichaCatastralResponse.setNromed(rs.getString("nromed")); 
		fichaCatastralResponse.setCatetar(rs.getString("catetar")); 
		fichaCatastralResponse.setNrocatastro(rs.getString("nrocatastro")); 
		fichaCatastralResponse.setCodsector_new(rs.getString("codsector_new")); 
		fichaCatastralResponse.setCodmza_new(rs.getString("codmza_new")); 
		fichaCatastralResponse.setNrolote_new(rs.getString("nrolote_new")); 
		fichaCatastralResponse.setNrosublote_new(rs.getString("nrosublote_new")); 
		fichaCatastralResponse.setReferencia_new(rs.getString("referencia_new")); 
		fichaCatastralResponse.setHabitada(rs.getString("habitada")); 
		fichaCatastralResponse.setHabitantes(rs.getString("habitantes")); 
		fichaCatastralResponse.setTiposervicio_new(rs.getString("tiposervicio_new")); 
		fichaCatastralResponse.setTipoconstruccion(rs.getString("tipoconstruccion")); 
		fichaCatastralResponse.setTipomaterialconst(rs.getString("tipomaterialconst")); 
		fichaCatastralResponse.setTipoaba(rs.getString("tipoaba")); 
		fichaCatastralResponse.setCodalmacenaje(rs.getString("codalmacenaje")); 
		fichaCatastralResponse.setPiscina(rs.getString("piscina")); 
		fichaCatastralResponse.setNropisos(rs.getString("nropisos")); 
		fichaCatastralResponse.setTipopredio(rs.getString("tipopredio")); 
		fichaCatastralResponse.setDatos_correctos(rs.getString("datos_correctos")); 
		fichaCatastralResponse.setPropietario_new(rs.getString("propietario_new")); 
		fichaCatastralResponse.setDireccion_new(rs.getString("direccion_new")); 
		fichaCatastralResponse.setTiporesponsable(rs.getString("tiporesponsable")); 
		fichaCatastralResponse.setCelular(rs.getString("celular")); 
		fichaCatastralResponse.setEmail(rs.getString("email")); 
		fichaCatastralResponse.setSuministroluz(rs.getString("suministroluz")); 
		fichaCatastralResponse.setConcajaagua(rs.getString("concajaagua")); 
		fichaCatastralResponse.setLoccaja_a(rs.getString("loccaja_a")); 
		fichaCatastralResponse.setContapaagua(rs.getString("contapaagua")); 
		fichaCatastralResponse.setEsttapa_a(rs.getString("esttapa_a")); 
		fichaCatastralResponse.setEstadocaja_a(rs.getString("estadocaja_a")); 
		fichaCatastralResponse.setTipocaja_a(rs.getString("tipocaja_a")); 
		fichaCatastralResponse.setTipotapa_a(rs.getString("tipotapa_a")); 
		fichaCatastralResponse.setTipomaterial_a(rs.getString("tipomaterial_a")); 
		fichaCatastralResponse.setTipoaccesoriosconex_a(rs.getString("tipoaccesoriosconex_a")); 
		fichaCatastralResponse.setCoddiametro_anew(rs.getString("coddiametro_anew")); 
		fichaCatastralResponse.setEstconexion_a(rs.getString("estconexion_a")); 
		fichaCatastralResponse.setTipoaccesoriosnoreglamentados_a(rs.getString("tipoaccesoriosnoreglamentados_a")); 
		fichaCatastralResponse.setTipocorte_a(rs.getString("tipocorte_a")); 
		fichaCatastralResponse.setPavconagu_a(rs.getString("pavconagu_a")); 
		fichaCatastralResponse.setVereda_a(rs.getString("vereda_a")); 
		fichaCatastralResponse.setTipofugas_a(rs.getString("tipofugas_a")); 
		fichaCatastralResponse.setSituacionconex_a(rs.getString("situacionconex_a")); 
		fichaCatastralResponse.setTipomodelocajaconex_a(rs.getString("tipomodelocajaconex_a")); 
		fichaCatastralResponse.setTienemedidor(rs.getString("tienemedidor")); 
		fichaCatastralResponse.setTipomed(rs.getString("tipomed")); 
		fichaCatastralResponse.setMarcamed(rs.getString("marcamed")); 
		fichaCatastralResponse.setCoddiametro_m(rs.getString("coddiametro_m")); 
		fichaCatastralResponse.setEstadomed(rs.getString("estadomed")); 
		fichaCatastralResponse.setPosicionmed(rs.getString("posicionmed")); 
		fichaCatastralResponse.setTipolectura(rs.getString("tipolectura")); 
		fichaCatastralResponse.setNromed_new(rs.getString("nromed_new")); 
		fichaCatastralResponse.setLecturaultima(rs.getString("lecturaultima")); 
		fichaCatastralResponse.setModelomed(rs.getString("modelomed")); 
		fichaCatastralResponse.setConcajadesague(rs.getString("concajadesague")); 
		fichaCatastralResponse.setLoccaja_d(rs.getString("loccaja_d")); 
		fichaCatastralResponse.setContapadesague(rs.getString("contapadesague")); 
		fichaCatastralResponse.setEsttapa_d(rs.getString("esttapa_d")); 
		fichaCatastralResponse.setTipotapa_d(rs.getString("tipotapa_d")); 
		fichaCatastralResponse.setTipocaja_d(rs.getString("tipocaja_d")); 
		fichaCatastralResponse.setEstadocaja_d(rs.getString("estadocaja_d")); 
		fichaCatastralResponse.setTipomaterial_d(rs.getString("tipomaterial_d")); 
		fichaCatastralResponse.setCoddiametro_d(rs.getString("coddiametro_d")); 
		fichaCatastralResponse.setTipotapondeo_d(rs.getString("tipotapondeo_d")); 
		fichaCatastralResponse.setPavconagu_d(rs.getString("pavconagu_d")); 
		fichaCatastralResponse.setVereda_d(rs.getString("vereda_d")); 
		fichaCatastralResponse.setFugasdesague(rs.getString("fugasdesague")); 
		fichaCatastralResponse.setSituacionconex_d(rs.getString("situacionconex_d")); 
		fichaCatastralResponse.setTipomodelocajaconex_d(rs.getString("tipomodelocajaconex_d")); 
		fichaCatastralResponse.setSospechosovma(rs.getString("sospechosovma")); 
		fichaCatastralResponse.setCatetar(rs.getString("catetar")); 
		fichaCatastralResponse.setCatetar_new(rs.getString("catetar_new")); 
		fichaCatastralResponse.setUnidusotmp(rs.getString("unidusotmp")); 
		fichaCatastralResponse.setActividad(rs.getString("actividad")); 
		//fichaCatastralResponse.setNrocajaadicionalagua(rs.getString("nrocajaadicionalagua")); 
		//fichaCatastralResponse.setEstadounoagua(rs.getString("estadounoagua")); 
		/*fichaCatastralResponse.setMedidaunoagua(rs.getString("medidaunoagua")); 
		fichaCatastralResponse.setEstadodosagua(rs.getString("estadodosagua")); 
		fichaCatastralResponse.setMedidadosagua(rs.getString("medidadosagua")); 
		fichaCatastralResponse.setEstadotresagua(rs.getString("estadotresagua")); 
		fichaCatastralResponse.setMedidatresagua(rs.getString("medidatresagua")); 
		fichaCatastralResponse.setNrocajaadicionaldesague(rs.getString("nrocajaadicionaldesague")); 
		fichaCatastralResponse.setEstadounoalca(rs.getString("estadounoalca")); 
		fichaCatastralResponse.setMedidaunoalca(rs.getString("medidaunoalca")); 
		fichaCatastralResponse.setEstadodosalca(rs.getString("estadodosalca")); 
		fichaCatastralResponse.setMedidadosalca(rs.getString("medidadosalca")); 
		fichaCatastralResponse.setEstadotresalca(rs.getString("estadotresalca")); 
		fichaCatastralResponse.setMedidatresalca(rs.getString("medidatresalca"));*/
		fichaCatastralResponse.setObservacion(rs.getString("observacion"));
		fichaCatastralResponse.setMedidalotefrente(rs.getString("medidalotefrente"));
		fichaCatastralResponse.setMedidaejeagua(rs.getString("medidaejeagua"));
		fichaCatastralResponse.setMedidaejedesague(rs.getString("medidaejedesague"));
		fichaCatastralResponse.setLatitud(rs.getString("latitud"));
		fichaCatastralResponse.setLongitud(rs.getString("longitud"));
		fichaCatastralResponse.setFotofachada(rs.getString("fotofachada"));
		fichaCatastralResponse.setFotocajaagua(rs.getString("fotocajaagua"));
		fichaCatastralResponse.setFotocajadesague(rs.getString("fotocajadesague"));
		fichaCatastralResponse.setFotodetalle4(rs.getString("fotodetalle4"));
		fichaCatastralResponse.setFotodetalle5(rs.getString("fotodetalle5"));
		fichaCatastralResponse.setFecha_visita(rs.getString("fecha_visita"));
		fichaCatastralResponse.setHora_visita(rs.getString("hora_visita"));
		fichaCatastralResponse.setGestor(rs.getString("gestor"));
		fichaCatastralResponse.setEncuestador(rs.getString("encuestador"));
		fichaCatastralResponse.setInspector(rs.getString("inspector"));
		fichaCatastralResponse.setUsermodificador(rs.getString("usermodificador"));
		fichaCatastralResponse.setFechamodificacion(rs.getString("fechamodificacion"));
		fichaCatastralResponse.setCreador(rs.getString("creador"));
		fichaCatastralResponse.setFechareg(rs.getString("fechareg"));
		fichaCatastralResponse.setNrocatastro(rs.getString("nrocatastro"));
		

	 
	    return fichaCatastralResponse;
  }
}
