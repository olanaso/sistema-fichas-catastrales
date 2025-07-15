package com.servicio.datos.repository.AppMovil;

import com.servicio.datos.model.InspectoresRequest;
import com.servicio.datos.rowmapper.InspectoresRowMaper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class InspectoresRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<InspectoresRequest> ObtenerInspectores(InspectoresRequest inspectores) {
    String query = "select codsede, codinspector,nombres, dni,fechareg,login,clave,asignadoareclamos,asignadoalectura,asignadoacortes,asignadocatastro = 0,asignadoinspecciones = 0,asignadoconsultas, supervisor, codemp,codsede,asignadocatastroreal, estareg from fichacatastral.inspectores   where login is not null and estareg = 1  order by codsede , codinspector";
   
    List<InspectoresRequest> rows = this.jdbcTemplate.query(query, (RowMapper)new InspectoresRowMaper());
    return rows;
  }
}
