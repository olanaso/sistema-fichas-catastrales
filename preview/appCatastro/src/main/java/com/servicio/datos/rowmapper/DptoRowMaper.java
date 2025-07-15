package com.servicio.datos.rowmapper;

import com.servicio.datos.model.DptoRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class DptoRowMaper implements RowMapper {
  public DptoRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
    DptoRequest dptoRequest = new DptoRequest();
    dptoRequest.setCodpto(rs.getString("coddpto"));
    dptoRequest.setCodprov(rs.getString("codprov"));
    dptoRequest.setNombre(rs.getString("nombre"));
   // dptoRequest.setEstareg(rs.getString("estareg"));
    return dptoRequest;
  }
}
