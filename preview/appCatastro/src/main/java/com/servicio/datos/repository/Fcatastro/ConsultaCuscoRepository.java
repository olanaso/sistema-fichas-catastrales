package com.servicio.datos.repository.Fcatastro;

import com.servicio.datos.model.Fcatastro.*;
import com.servicio.datos.rowmapper.Fcatastro.ConsultaCuscoRowMaper;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ConsultaCuscoRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
 


public FichaCatastralCuscoResponse ConsultaFichaCusco(Integer codcliente, String nrocatastro) {
	

	String sql = "SELECT * from fichacatastral.usp_web_clientefichacatastro (" + codcliente+" )";

    List<FichaCatastralCuscoResponse> rows = this.jdbcTemplate.query(sql.toString(), (RowMapper)new ConsultaCuscoRowMaper());
    return rows.get(0);
}
}
