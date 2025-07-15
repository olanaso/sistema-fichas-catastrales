package com.servicio.datos.repository.Fcatastro;

import com.servicio.datos.model.ClienteRequest;
import com.servicio.datos.model.ClienteResponse;
import com.servicio.datos.model.ListaofflineResponse;
import com.servicio.datos.rowmapper.ClienteRowMaper;
import com.servicio.datos.rowmapper.Fcatastro.ListaOfflineRowMaper;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ListaOfflineRepository_old {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public ListaofflineResponse ObtenerData(ClienteRequest cliente) {
	  ListaofflineResponse validaRegistro=null;
		 
		  String sql = "exec dbo.usp_genera_listaCatastroAPP '" + cliente.getCodemp()+ "','" + cliente.getCodsede()+ "','" + cliente.getCodins()+ "','" + cliente.getTipodescarga()+ "'";
		  
		 
		
		  List <ListaofflineResponse> rows = this.jdbcTemplate.query(sql, (RowMapper)new ListaOfflineRowMaper());
		  int lect=rows.size();
		  
		  if(lect!=0) {
			  validaRegistro= rows.get(0);
		  }else {
			  validaRegistro=null;
		  }
		  
		  return  validaRegistro;
	  }
	}