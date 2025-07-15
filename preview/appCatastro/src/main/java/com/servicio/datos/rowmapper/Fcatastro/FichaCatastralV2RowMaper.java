package com.servicio.datos.rowmapper.Fcatastro;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import com.servicio.datos.model.Fcatastro.ConsultaFichaCatastralV2Response;
import com.servicio.datos.model.Fcatastro.FichaCatastralResponse;

public class FichaCatastralV2RowMaper implements RowMapper {
	
	public ConsultaFichaCatastralV2Response mapRow(ResultSet rs, int rowNum) throws SQLException {
		  
		ConsultaFichaCatastralV2Response fichaCatastralResponse = new ConsultaFichaCatastralV2Response();
		  
		fichaCatastralResponse.setCodemp(rs.getString("codemp"));
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
		fichaCatastralResponse.setActividad(rs.getString("codactividad")); 
		fichaCatastralResponse.setNrocajaadicionalagua(rs.getString("nrocajaadicionalagua")); 
		fichaCatastralResponse.setEstadounoagua(rs.getString("estadounoagua")); 
		fichaCatastralResponse.setMedidaunoagua(rs.getString("medidaunoagua")); 
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
		fichaCatastralResponse.setMedidatresalca(rs.getString("medidatresalca"));
		fichaCatastralResponse.setObservacion(rs.getString("observacion"));
		fichaCatastralResponse.setMedidalotefrente(rs.getString("medidalotefrente"));
		fichaCatastralResponse.setMedidaejeagua(rs.getString("medidaejeagua"));
		fichaCatastralResponse.setMedidaejedesague(rs.getString("medidaejedesague"));
		fichaCatastralResponse.setLatitud(rs.getString("latitud"));
		fichaCatastralResponse.setLongitud(rs.getString("longitud"));
		
		fichaCatastralResponse.setNrocalle(rs.getString("nrocalle"));
		fichaCatastralResponse.setDni(rs.getString("dni"));
		fichaCatastralResponse.setHorasxdia(rs.getString("horasxdia"));
		fichaCatastralResponse.setDiasxsemana(rs.getString("diasxsemana"));
		fichaCatastralResponse.setCoorutmaguaeste(rs.getString("coorutmaguaeste"));
		fichaCatastralResponse.setCoorutmaguanorte(rs.getString("coorutmaguanorte"));
		fichaCatastralResponse.setCoorutmdesagueeste(rs.getString("coorutmdesagueeste"));
		fichaCatastralResponse.setCoorutmdesaguenorte(rs.getString("coorutmdesaguenorte"));
		fichaCatastralResponse.setCoorutmpredioeste(rs.getString("coorutmpredioeste"));
		fichaCatastralResponse.setCoorutmpredionorte(rs.getString("coorutmpredionorte"));
		
		fichaCatastralResponse.setTipo_usuario(rs.getString("tipo_usuario"));
		fichaCatastralResponse.setId_sucursal(rs.getString("id_sucursal"));
		fichaCatastralResponse.setNombre_sucursal(rs.getString("nombre_sucursal"));
		fichaCatastralResponse.setId_sector(rs.getString("id_sector"));
		fichaCatastralResponse.setId_manzana(rs.getString("id_manzana"));
		  fichaCatastralResponse.setNro_lote(rs.getString("nro_lote"));
		  fichaCatastralResponse.setNro_sublote(rs.getString("nro_sublote"));
		  fichaCatastralResponse.setId_cliente(rs.getString("id_cliente"));
		  fichaCatastralResponse.setNombre_cliente(rs.getString("nombre_cliente"));
		  fichaCatastralResponse.setDescripcion_urba(rs.getString("descripcion_urba"));
		  fichaCatastralResponse.setDescripcion_corta(rs.getString("descripcion_corta"));
		  fichaCatastralResponse.setDescripcion_calle(rs.getString("descripcion_calle"));
		  fichaCatastralResponse.setNro_calle(rs.getString("nro_calle"));
		  fichaCatastralResponse.setCod_ruta_distribucion(rs.getString("cod_ruta_distribucion"));
		  fichaCatastralResponse.setNro_orden_ruta_distribucion(rs.getString("nro_orden_ruta_distribucion"));
		  fichaCatastralResponse.setId_estado_servicio(rs.getString("id_estado_servicio"));
		  fichaCatastralResponse.setTipo_servicio(rs.getString("tipo_servicio"));
		  fichaCatastralResponse.setCatetarifa(rs.getString("catetarifa"));
		  fichaCatastralResponse.setUnidades_uso(rs.getString("unidades_uso"));
		  fichaCatastralResponse.setActividad(rs.getString("actividad"));
		  fichaCatastralResponse.setNromedidor(rs.getString("nromedidor"));
		  fichaCatastralResponse.setTipo_promedio(rs.getString("tipo_promedio"));
		  fichaCatastralResponse.setLectura_anterior(rs.getString("lectura_anterior"));
		  fichaCatastralResponse.setLectura_ultima(rs.getString("lectura_ultima"));
		  fichaCatastralResponse.setConsumo(rs.getString("consumo"));
		  fichaCatastralResponse.setSituacion_medidor(rs.getString("situacion_medidor"));
		  fichaCatastralResponse.setConsumo_facturacion(rs.getString("consumo_facturacion"));
		  fichaCatastralResponse.setImporte_mes_deuda(rs.getString("importe_mes_deuda"));
		  fichaCatastralResponse.setImporte_deuda(rs.getString("importe_deuda"));
		  fichaCatastralResponse.setImporte_deuda_refinanci(rs.getString("importe_deuda_refinanci"));
		  fichaCatastralResponse.setFecha_corte(rs.getString("fecha_corte"));
		  fichaCatastralResponse.setCatastro(rs.getString("catastro"));
		  fichaCatastralResponse.setCod_ant(rs.getString("cod_ant"));
		  fichaCatastralResponse.setDiametro_agua(rs.getString("diametro_agua"));
		  fichaCatastralResponse.setTipousuario(rs.getString("tipousuario"));
		  fichaCatastralResponse.setMesesdeuda(rs.getString("mesesdeuda"));
		  fichaCatastralResponse.setCodsector(rs.getString("codsector"));
		  fichaCatastralResponse.setCoddist(rs.getString("coddist"));
		  fichaCatastralResponse.setTipomaterialcaja_a(rs.getString("tipomaterialcaja_a"));
		  fichaCatastralResponse.setTipomaterial_predio(rs.getString("tipomaterial_predio"));
		  fichaCatastralResponse.setNromed_sistema(rs.getString("nromed_sistema"));
		  fichaCatastralResponse.setCodcalle(rs.getString("codcalle"));
		  fichaCatastralResponse.setCodurbaso(rs.getString("codurbaso"));
		  fichaCatastralResponse.setTelefono(rs.getString("telefono"));
		  fichaCatastralResponse.setNrocontrato(rs.getString("nrocontrato"));
		  fichaCatastralResponse.setCatetar(rs.getString("catetar"));
		  fichaCatastralResponse.setDiametroalc(rs.getString("diametroalc"));
		  fichaCatastralResponse.setNoconsiderar(rs.getString("noconsiderar"));
		  fichaCatastralResponse.setCodprov(rs.getString("codprov"));
		  
		  fichaCatastralResponse.setTipofacturacion(rs.getString("tipofacturacion"));
		  
		  fichaCatastralResponse.setFechainsmed(rs.getString("fechainsmed"));
		  fichaCatastralResponse.setEstado(rs.getString("estado"));
		  fichaCatastralResponse.setMensajeFicha(rs.getString("mensaje"));
		  fichaCatastralResponse.setRuta(rs.getString("ruta"));
		  
		  
		  


	 
	    return fichaCatastralResponse;
  }
}
