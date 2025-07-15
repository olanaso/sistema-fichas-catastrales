package com.servicio.datos.service.Fcatastro;



import com.servicio.datos.model.GeneraResponse;
import com.servicio.datos.model.Fcatastro.*;
import com.servicio.datos.rowmapper.Fcatastro.FichaCatastralMovilRowMaper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
public class FichaCatastralMovilCuscoServiceImpl implements FichaCatastralMovilCuscoService {
	  
	
	@Autowired
	 @Qualifier("jdbcMaster")
	 private JdbcTemplate jdbcTemplate;
	  

  public int registraFichaCusco(FichaCatastralMovilCuscoRequest fichaCatastralMovilCuscoRequest) {
	  String detalleRegistro = "";
	    String barridoRegistro = "";
	    String barridoRegistroF= "";
	    String validaRegistro="";
	
    String lectUtlima= ((FichaCatrastralMovilCusco)fichaCatastralMovilCuscoRequest.getListaFichaCatastroMovilCusco().get(0)).getLecturaultima();
   
    
    if (lectUtlima == "" ||lectUtlima == null) {
    	lectUtlima ="0";
    } else {
    	lectUtlima = ((FichaCatrastralMovilCusco)fichaCatastralMovilCuscoRequest.getListaFichaCatastroMovilCusco().get(0)).getLecturaultima();
    } 
 
    //`
    //nrocalle.replaceAll("'", "");
    

    try {
    	int count = this.jdbcTemplate.queryForObject(
    	        "SELECT COUNT(*) FROM fichacatastral.detfichacatastro_app",
    	        Integer.class
    	    );
        
      
        for (FichaCatrastralMovilCusco fichaCatrastralMovilIndividual : fichaCatastralMovilCuscoRequest.getListaFichaCatastroMovilCusco()) {
            detalleRegistro = String.valueOf(detalleRegistro) + "INSERT INTO fichacatastral.detfichacatastro_app (codigo,codemp,codsuc,id_cliente,id_estado_servicio,coddist,id_manzana,nro_lote,nro_sublote,"
            		+ "codsector,codmza_new,nrolote_new,nrosublote_new,referencia,referencia_new,urbanizacion,habitada,habitantes,tiposervicio_campo,tiposervicio_sistema,tipoconstruccion,tipomaterial_predio,tipoaba,"
            		+ "codalmacenaje,piscina,nropisos,tipopredio,tipousuario,datos_correctos,propietario,nombre_cliente,"
            		+ "direccion_campo,direccion,nrocalle,tiporesponsable,tipocaja_a,loccaja_a,contapaagua,esttapa_a,tipotapa_a,tipomaterialcaja_a,"
            		+ "estadocaja_a,tipomaterial_a,tipoaccesoriosconex_a,coddiametro_a,coddiametro_sistema_a,estconexion_a,tipoaccesoriosnoreglamentados_a,tipocorte_a,pavconagu_a,"
            		+ "vereda_a,tipofugas_a,estservicio_a,tipomodelocajaconex_a,tienemedidor,tipomed,marcamed,coddiametro_m,estadomed,posicionmed,tipolectura,nromed_sistema,nromed_campo,"
            		+ "lecturaultima,modelomed,concajaagua,concajadesague,loccaja_d,contapadesague,esttapa_d,tipotapa_d,tipocaja_d,estadocaja_d,tipomaterial_d,"
            		+ "coddiametro_d,tipocorte_d,pavconagu_d,vereda_d,fugasdesague,estservicio_d,tipomodelocajaconex_d,sospechosovma,catetar_campo,catetar_sistema,"
            		+ "porcentaje_categoria,actividad1,nrocajaadicionalagua,estadounoagua,medidaunoagua,estadodosagua,medidadosagua,estadotresagua,"
            		+ "medidatresagua,nrocajaadicionaldesague,estadounoalca,medidaunoalca,estadodosalca,medidadosalca,estadotresalca,medidatresalca,"
            		+ "tipoobs,medidafrentelote,distanciaejecajaagua,distanciaejecajadesague,latitud,longitud,fotofachada,fotocajaagua,fotocajadesague,"
            		+ "fotodetalle4,fotodetalle5,inspector,fechamodificacion,fecha_envio,estado_envio,"
            		+ "fecha_reporte,telefono,email,suministro,nombre_completo,tiene_foto,observacion,fechareg,registrado,fechainserta,dni,horasxdia,diasxsemana,coorutmaguaeste,coorutmaguanorte,coorutmdesagueeste, coorutmdesaguenorte,coorutmpredioeste,coorutmpredionorte,"
            		+ "region,cuadra,nromunic,mzamunic,ltemunic,numero_dir,fecha_visita,hora_visita,gestor,encuestador,usermodificador,nrocatastro,ruta,nrocontrato,"
            		+ "codreservorio,codsectorabast,unidaddom,unidadcom,unidadind,unidadest,unidadsoc,funcionmultiple,razonsocial,estconexion,llavemed,tipocerrado,"
            		+ "tipocajaobserv,medidoroperativo,tipoestlectura,presionagu,nrolavatorios,nrolavadoras,nrowater,nroduchas,nrourinarios,nrogrifos,nropiscina,"
            		+ "nrotanquecisterna,nrotanqueelevado,estadolavatorios,estadolavadoras,estadowater,estadoduchas,estadourinarios,estadogrifos,estadopiscina,"
            		+ "estadotanquecisterna,estadotanqueelevado,fichaincompleta,existecodigo,tipoacccomercial,procesado,secuencia) "  
            		+ "VALUES ("+fichaCatrastralMovilIndividual.getCodigo() + ", '" + fichaCatrastralMovilIndividual.getCodemp() + "','" + fichaCatrastralMovilIndividual.getCodsuc()+ "','" + fichaCatrastralMovilIndividual.getId_cliente() + "','" +fichaCatrastralMovilIndividual.getId_estado_servicio() + "','" +fichaCatrastralMovilIndividual.getCoddist()+ "','" + fichaCatrastralMovilIndividual.getId_manzana() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getNro_lote().replaceAll("'", "`")+ "','" + fichaCatrastralMovilIndividual.getNro_sublote().replaceAll("'", "`") + "','" + fichaCatrastralMovilIndividual.getCodsector()+ "','"+fichaCatrastralMovilIndividual.getCodmza_new().replaceAll("'", "`")+ "'," + 
                    "'" + fichaCatrastralMovilIndividual.getNrolote_new().replaceAll("'", "`") + "','" + fichaCatrastralMovilIndividual.getNrosublote_new().replaceAll("'", "`")+ "','" + fichaCatrastralMovilIndividual.getReferencia().replaceAll("'", "`") + "','" + fichaCatrastralMovilIndividual.getReferencia_new().replaceAll("'", "`") + "'," +  
                    "'" + fichaCatrastralMovilIndividual.getUrbanizacion().replaceAll("'", "`")+ "','" + fichaCatrastralMovilIndividual.getHabitada()+ "','" + fichaCatrastralMovilIndividual.getHabitantes()+ "','"+fichaCatrastralMovilIndividual.getTiposervicio_campo() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTiposervicio_sistema()+ "','" + fichaCatrastralMovilIndividual.getTipoconstruccion()+ "','" + fichaCatrastralMovilIndividual.getTipomaterial_predio()+ "','" + fichaCatrastralMovilIndividual.getTipoaba()+ "'," + 
                    "'" + fichaCatrastralMovilIndividual.getCodalmacenaje()+ "','" + fichaCatrastralMovilIndividual.getPiscina()+ "','" + fichaCatrastralMovilIndividual.getNropisos()+ "','"+fichaCatrastralMovilIndividual.getTipopredio() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTipousuario()+ "','" + fichaCatrastralMovilIndividual.getDatos_correctos()+ "','" + fichaCatrastralMovilIndividual.getPropietario().replaceAll("'", "`")+ "','"+fichaCatrastralMovilIndividual.getNombre_cliente().replaceAll("'", "`") + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getDireccion_campo().replaceAll("'", "`")+ "','" + fichaCatrastralMovilIndividual.getDireccion().replaceAll("'", "`")+ "','" + fichaCatrastralMovilIndividual.getNrocalle().replaceAll("'", "`")+ "','"+fichaCatrastralMovilIndividual.getTiporesponsable() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTipocaja_a()+ "','" + fichaCatrastralMovilIndividual.getLoccaja_a()+ "','" + fichaCatrastralMovilIndividual.getContapaagua()+ "','"+fichaCatrastralMovilIndividual.getEsttapa_a() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTipotapa_a()+ "','" + fichaCatrastralMovilIndividual.getTipomaterialcaja_a()+ "','" + fichaCatrastralMovilIndividual.getEstadocaja_a()+ "','"+fichaCatrastralMovilIndividual.getTipomaterial_a() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTipoaccesoriosconex_a()+ "','" + fichaCatrastralMovilIndividual.getCoddiametro_a()+ "','" + fichaCatrastralMovilIndividual.getCoddiametro_sistema_a()+ "','"+fichaCatrastralMovilIndividual.getEstconexion_a() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTipoaccesoriosnoreglamentados_a()+ "','" + fichaCatrastralMovilIndividual.getTipocorte_a()+ "','" + fichaCatrastralMovilIndividual.getPavconagu_a()+ "','"+fichaCatrastralMovilIndividual.getVereda_a() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTipofugas_a()+ "','" + fichaCatrastralMovilIndividual.getEstservicio_a()+ "','" + fichaCatrastralMovilIndividual.getTipomodelocajaconex_a()+ "','"+fichaCatrastralMovilIndividual.getTienemedidor()+ "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTipomed()+ "','" + fichaCatrastralMovilIndividual.getMarcamed()+ "','" + fichaCatrastralMovilIndividual.getCoddiametro_m()+ "','"+fichaCatrastralMovilIndividual.getEstadomed() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getPosicionmed()+ "','" + fichaCatrastralMovilIndividual.getTipolectura()+ "','"+fichaCatrastralMovilIndividual.getNromed_sistema().replaceAll("'", "`") + "','"+fichaCatrastralMovilIndividual.getNromed_campo() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getLecturaultima()+ "','" + fichaCatrastralMovilIndividual.getModelomed()+ "','" + fichaCatrastralMovilIndividual.getConcajaagua()+ "','"+fichaCatrastralMovilIndividual.getConcajadesague() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getLoccaja_d()+ "','" + fichaCatrastralMovilIndividual.getContapadesague()+ "','" + fichaCatrastralMovilIndividual.getEsttapa_d()+ "','"+fichaCatrastralMovilIndividual.getTipotapa_d() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTipocaja_d()+ "','" + fichaCatrastralMovilIndividual.getEstadocaja_d()+ "','" + fichaCatrastralMovilIndividual.getTipomaterial_d()+ "','"+fichaCatrastralMovilIndividual.getCoddiametro_d() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTipocorte_d()+ "','" + fichaCatrastralMovilIndividual.getPavconagu_d()+ "','" + fichaCatrastralMovilIndividual.getVereda_d()+ "','"+fichaCatrastralMovilIndividual.getFugasdesague() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEstservicio_d()+ "','" + fichaCatrastralMovilIndividual.getTipomodelocajaconex_d()+ "','" + fichaCatrastralMovilIndividual.getSospechosovma()+ "','"+fichaCatrastralMovilIndividual.getCatetar_campo() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getCatetar_sistema()+ "','" + fichaCatrastralMovilIndividual.getPorcentaje_categoria()+ "','" + fichaCatrastralMovilIndividual.getActividad1()+ "','"+fichaCatrastralMovilIndividual.getNrocajaadicionalagua() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEstadounoagua()+ "','" + fichaCatrastralMovilIndividual.getMedidaunoagua()+ "','" + fichaCatrastralMovilIndividual.getEstadodosagua()+ "','"+fichaCatrastralMovilIndividual.getMedidadosagua() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEstadotresagua()+ "','" + fichaCatrastralMovilIndividual.getMedidatresagua()+ "','" + fichaCatrastralMovilIndividual.getNrocajaadicionaldesague()+ "','"+fichaCatrastralMovilIndividual.getEstadounoalca() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getMedidaunoalca()+ "','" + fichaCatrastralMovilIndividual.getEstadodosalca()+ "','" + fichaCatrastralMovilIndividual.getMedidadosalca()+ "','"+fichaCatrastralMovilIndividual.getEstadotresalca() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getMedidatresalca()+ "','" + fichaCatrastralMovilIndividual.getTipoobs()+ "','" + fichaCatrastralMovilIndividual.getMedidafrentelote()+ "','"+fichaCatrastralMovilIndividual.getDistanciaejecajaagua() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getDistanciaejecajadesague()+ "','" + fichaCatrastralMovilIndividual.getLatitud()+ "','" + fichaCatrastralMovilIndividual.getLongitud()+ "','"+fichaCatrastralMovilIndividual.getFotofachada() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getFotocajaagua()+ "','" + fichaCatrastralMovilIndividual.getFotocajadesague()+ "','" + fichaCatrastralMovilIndividual.getFotodetalle4()+ "','"+fichaCatrastralMovilIndividual.getFotodetalle5() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getInspector()+ "','" + fichaCatrastralMovilIndividual.getFechamodificacion()+ "','"+fichaCatrastralMovilIndividual.getFecha_envio() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEstado_envio() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getFecha_reporte()+ "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTelefono() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEmail() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getSuministro() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getNombre_completo() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTiene_foto() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getObservacion() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getFechareg() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getRegistrado() + "'," +
                    "'" + fichaCatrastralMovilIndividual.getFechareg() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getDni() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getHorasxdia()+ "'," + 
                    "'" + fichaCatrastralMovilIndividual.getDiasxsemana() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getCoorutmaguaeste() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getCoorutmaguanorte() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getCoorutmdesagueeste() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getCoorutmdesaguenorte() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getCoorutmpredioeste() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getCoorutmpredionorte() + "'," + 
                    
                    "'" + fichaCatrastralMovilIndividual.getRegion() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getCuadra() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getNromunic() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getMzamunic() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getLtemunic() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getNumero_dir() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getFecha_visita() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getHora_visita() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getGestor() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEncuestador() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getUsermodificador() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getNrocatastro() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getRuta() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getNrocontrato() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getCodreservorio() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getCodsectorabast() + "'," + 
                    "" + fichaCatrastralMovilIndividual.getUnidaddom() + "," + 
                    "" + fichaCatrastralMovilIndividual.getUnidadcom() + "," + 
                    "" + fichaCatrastralMovilIndividual.getUnidadind() + "," + 
                    "" + fichaCatrastralMovilIndividual.getUnidadest() + "," + 
                    "" + fichaCatrastralMovilIndividual.getUnidadsoc() + "," + 
                    "'" + fichaCatrastralMovilIndividual.getFuncionmultiple() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getRazonsocial() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEstconexion() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getLlavemed() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTipocerrado() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTipocajaobserv() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getMedidoroperativo() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTipoestlectura() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getPresionagu() + "'," + 
                    "" + fichaCatrastralMovilIndividual.getNrolavatorios() + "," + 
                    "" + fichaCatrastralMovilIndividual.getNrolavadoras() + "," + 
                    "" + fichaCatrastralMovilIndividual.getNrowater() + "," + 
                    "" + fichaCatrastralMovilIndividual.getNroduchas() + "," + 
                    "" + fichaCatrastralMovilIndividual.getNrourinarios() + "," + 
                    "" + fichaCatrastralMovilIndividual.getNrogrifos() + "," + 
                    "" + fichaCatrastralMovilIndividual.getNropiscina() + "," + 
                    "" + fichaCatrastralMovilIndividual.getNrotanquecisterna() + "," + 
                    "" + fichaCatrastralMovilIndividual.getNrotanqueelevado() + "," + 
                    "'" + fichaCatrastralMovilIndividual.getEstadolavatorios() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEstadolavadoras() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEstadowater() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEstadoduchas() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEstadourinarios() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEstadogrifos() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEstadopiscina() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEstadotanquecisterna() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getEstadotanqueelevado() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getFichaincompleta() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getExistecodigo() + "'," + 
                    "'" + fichaCatrastralMovilIndividual.getTipoacccomercial() + "'," + 
                    "  0," + 
                    "" + fichaCatrastralMovilIndividual.getSecuencia() + ");";

          } 
        
        for (RegistraTarifasIndividual registraTarifasIndividual : fichaCatastralMovilCuscoRequest.getListaTarifas()) {
            detalleRegistro = String.valueOf(detalleRegistro) + " INSERT INTO fichacatastral.det_tarifas_app (codemp,codcliente,tarifa,actividad,cantidad,razonsocial,referencia) "
            		+ "VALUES ('" + registraTarifasIndividual.getCodemp() + "'," + registraTarifasIndividual.getCodcliente() + ","
            		+ "'" +registraTarifasIndividual.getTarifa() + "','" +registraTarifasIndividual.getActividad()+ "'," +registraTarifasIndividual.getCantidad()+ ",'" +registraTarifasIndividual.getRazonsocial()+ "','" +registraTarifasIndividual.getReferencia()+ "');";
   
          }
  
       barridoRegistro = String.valueOf(barridoRegistro) + " SELECT * FROM fichacatastral.usp_app_barridocatastro  ('" + ((FichaCatrastralMovilCusco)fichaCatastralMovilCuscoRequest.getListaFichaCatastroMovilCusco().get(0)).getCodemp()   + "'," + 
                " '" + ((FichaCatrastralMovilCusco)fichaCatastralMovilCuscoRequest.getListaFichaCatastroMovilCusco().get(0)).getCodsede() + "'," + 
                " '" + ((FichaCatrastralMovilCusco)fichaCatastralMovilCuscoRequest.getListaFichaCatastroMovilCusco().get(0)).getCodinspector()   + "');";
          

       //detalleRegistro+  
        barridoRegistroF = detalleRegistro+barridoRegistro;
    	
        validaRegistro="1";
    }catch (DataAccessException e){
    	validaRegistro="0";
    }
    
	 	
    if(validaRegistro.equals("1"))  {
        jdbcTemplate.update(detalleRegistro);
    	List<GeneraResponse> rows = this.jdbcTemplate.query(barridoRegistro.toString(), (RowMapper)new FichaCatastralMovilRowMaper());
    
    	int lect=rows.size();
    	return lect;
    	
    //	return 0;
   	}else {
   	    	
   	   	  return 0;
   	}
    
      
    }
}
