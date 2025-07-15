package com.servicio.datos.repository.Fcatastro;

import com.servicio.datos.model.Fcatastro.*;
import com.servicio.datos.rowmapper.Fcatastro.ConsultaRowMaper;
import com.servicio.datos.rowmapper.Fcatastro.FichaCatastralRowMaper;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class FichaCatastralRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  


public FichaCatastralResponse ConsultaFicha(Integer codcliente, String nrocatastro) {
 
	String sql = "exec dbo.usp_web_clienteFichaCatastro " + codcliente+" ";
    List<FichaCatastralResponse> rows = this.jdbcTemplate.query(sql.toString(), (RowMapper)new FichaCatastralRowMaper());
    return rows.get(0);
}
}
