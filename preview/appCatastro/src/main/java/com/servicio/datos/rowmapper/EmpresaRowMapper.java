package com.servicio.datos.rowmapper;

import com.servicio.datos.model.EmpresaResponse;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class EmpresaRowMapper implements RowMapper {
  public EmpresaResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
    EmpresaResponse empresaResponse = new EmpresaResponse();
    empresaResponse.setCodemp(rs.getString("codemp"));
    empresaResponse.setNombre(rs.getString("nombre"));
    empresaResponse.setDireccion(rs.getString("direccion"));
    empresaResponse.setRuc(rs.getString("ruc"));
    empresaResponse.setCoddpto(rs.getString("coddpto"));
    empresaResponse.setTelefono(rs.getString("telefono"));
    empresaResponse.setCcodeps(rs.getString("ccodeps"));
    
    
    empresaResponse.setAceptar(rs.getString("aceptar"));
    empresaResponse.setIpwebapp(rs.getString("ipwebapp"));
    empresaResponse.setWebsite(rs.getString("website"));
    empresaResponse.setLatitud(rs.getString("latitud"));
    empresaResponse.setLongitud(rs.getString("longitud"));
    empresaResponse.setRutaFicha(rs.getString("rutaFicha"));
    
    return empresaResponse;
  }
}
