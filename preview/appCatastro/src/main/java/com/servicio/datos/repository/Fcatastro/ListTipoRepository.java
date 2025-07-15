package com.servicio.datos.repository.Fcatastro;

import com.servicio.datos.model.Fcatastro.ListTipoRequest;
import com.servicio.datos.model.Fcatastro.ListTipoResponse;
import com.servicio.datos.rowmapper.Fcatastro.ListTiposRowMaper;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ListTipoRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<ListTipoRequest> ObtenerList(ListTipoRequest listTipoRequest) {
    
    String sql=" SELECT * FROM fichacatastral.usp_listadoTablaTipo('001', '"+listTipoRequest.getCodsuc()+"', '"+listTipoRequest.getTipo()+"') ";

    List<ListTipoRequest> rows = this.jdbcTemplate.query(sql.toString(), (RowMapper)new ListTiposRowMaper());
    return rows;
  }
}
