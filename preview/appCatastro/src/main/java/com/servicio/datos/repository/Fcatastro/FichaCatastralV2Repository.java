package com.servicio.datos.repository.Fcatastro;

import com.servicio.datos.model.Fcatastro.*;
import com.servicio.datos.rowmapper.Fcatastro.FichaCatastralV2RowMaper;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class FichaCatastralV2Repository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  

public ConsultaFichaCatastralV2Response ConsultaFichaV2(int codcliente) {
	
	   
    String sql = "exec dbo.usp_app_infoclienteCatas " + codcliente+"  ";
	
	  
    List<ConsultaFichaCatastralV2Response> rows = this.jdbcTemplate.query(sql.toString(), (RowMapper)new FichaCatastralV2RowMaper());
    return rows.get(0);
}
}
