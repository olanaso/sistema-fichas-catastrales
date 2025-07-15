package com.servicio.datos.repository;

import com.servicio.datos.model.ClienteRequest;
import com.servicio.datos.model.ClienteResponse;
import com.servicio.datos.rowmapper.ClienteRowMaper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ClienteRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public ClienteResponse ObtenerData(ClienteRequest cliente) {
		 ClienteResponse validaRegistro=null;
		 
		  String sql = "SELECT * FROM fichacatastral.usp_app_infocliente (" + cliente.getCodcliente()+ ")";
		
		  /*
		   * SELECT fichacatastral.usp_app_infocliente(
	329971
)
		   * */
		  
		  List <ClienteResponse> rows = this.jdbcTemplate.query(sql, (RowMapper)new ClienteRowMaper());
		  int lect=rows.size();
		  
		  if(lect!=0) {
			  validaRegistro= rows.get(0);
		  }else {
			  validaRegistro=null;
		  }
		  
		  return  validaRegistro;
	  }
	}