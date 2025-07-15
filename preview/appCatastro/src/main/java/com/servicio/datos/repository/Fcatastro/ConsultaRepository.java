package com.servicio.datos.repository.Fcatastro;

import com.servicio.datos.model.Fcatastro.ConsultaRequest;
import com.servicio.datos.model.Fcatastro.ConsultaResponse;
import com.servicio.datos.rowmapper.Fcatastro.ConsultaRowMaper;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ConsultaRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public ConsultaResponse ConsultaCliente(ConsultaRequest consultaRequest) {
	  
    String sql = "exec dbo.usp_listarfichacatastro '001', " + consultaRequest.getCodcliente()+"," + consultaRequest.getCodcatastro()+"";
    List<ConsultaResponse> rows = this.jdbcTemplate.query(sql.toString(), (RowMapper)new ConsultaRowMaper());
    return rows.get(0);
  }
}
