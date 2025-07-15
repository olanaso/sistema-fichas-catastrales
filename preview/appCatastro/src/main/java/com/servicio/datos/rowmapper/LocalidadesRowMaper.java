package com.servicio.datos.rowmapper;

import com.servicio.datos.model.LocalidadesRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class LocalidadesRowMaper implements RowMapper {
  public LocalidadesRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
    LocalidadesRequest localidadesRequest = new LocalidadesRequest();
    localidadesRequest.setCodsuc(rs.getString("codsuc"));
    localidadesRequest.setNombre(rs.getString("nombre"));
    return localidadesRequest;
  }
}
