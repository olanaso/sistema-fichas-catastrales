package com.servicio.datos.rowmapper;


import com.servicio.datos.model.UrbanizacionVO;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class UrbanizacionRowMaper implements RowMapper {
  public UrbanizacionVO mapRow(ResultSet rs, int rowNum) throws SQLException {
    UrbanizacionVO urbanizacionVO = new UrbanizacionVO();
    urbanizacionVO.setCodsuc(rs.getString("codsuc"));
    urbanizacionVO.setCodurbaso(rs.getString("codurbaso"));
    urbanizacionVO.setDescripcion(rs.getString("descripcion"));
    return urbanizacionVO;
  }
}
