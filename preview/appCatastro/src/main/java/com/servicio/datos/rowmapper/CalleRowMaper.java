package com.servicio.datos.rowmapper;

import com.servicio.datos.model.CalleRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class CalleRowMaper implements RowMapper {
  public CalleRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
    CalleRequest calleRequest = new CalleRequest();
    calleRequest.setCodcalle(rs.getString("codcalle"));
    calleRequest.setCodsuc(rs.getString("codsuc"));
    calleRequest.setDescripcion(rs.getString("descripcioncalle"));
    return calleRequest;
  }
}
