package com.servicio.datos.rowmapper;

import com.servicio.datos.model.DptoProvRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class DptoProvRowMaper implements RowMapper {
  public DptoProvRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
    DptoProvRequest dptoProvRequest = new DptoProvRequest();
    dptoProvRequest.setCodpto(rs.getString("coddpto"));
    dptoProvRequest.setCodprov(rs.getString("codprov"));
    dptoProvRequest.setCoddist(rs.getString("coddist"));
    dptoProvRequest.setNombre(rs.getString("nombre"));
    dptoProvRequest.setEstareg(rs.getString("estareg"));
    return dptoProvRequest;
  }
}
