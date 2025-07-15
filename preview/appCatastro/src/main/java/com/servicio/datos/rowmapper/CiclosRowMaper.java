package com.servicio.datos.rowmapper;

import com.servicio.datos.model.CiclosRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class CiclosRowMaper implements RowMapper {
  public CiclosRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
    CiclosRequest ciclosRequest = new CiclosRequest();
    ciclosRequest.setCodemp(rs.getString("codemp"));
    ciclosRequest.setCodciclo(rs.getString("codciclo"));
    ciclosRequest.setDescripcion(rs.getString("descripcion"));
    ciclosRequest.setAnio(rs.getString("anio"));
    ciclosRequest.setMes(rs.getString("mes"));
    ciclosRequest.setMes_del(rs.getString("mes_del"));
    ciclosRequest.setAnio_del(rs.getString("anio_del"));
    return ciclosRequest;
  }
}
