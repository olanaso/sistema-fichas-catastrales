package com.servicio.datos.rowmapper;

import com.servicio.datos.model.EmpresasRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class EmpresasRowMaper implements RowMapper {
  public EmpresasRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
    EmpresasRequest empresasRequest = new EmpresasRequest();
    empresasRequest.setCodemp(rs.getString("codemp"));
    empresasRequest.setEmpresa(rs.getString("empresa"));
    empresasRequest.setRuc(rs.getString("ruc"));
    empresasRequest.setDireccion(rs.getString("direccion"));
    empresasRequest.setMinutos_espera(rs.getString("min_espera_lectura"));
    empresasRequest.setPorminprom(rs.getString("porminprom"));
    empresasRequest.setCcodeps(rs.getString("ccodeps"));
    empresasRequest.setFotoconsmcero(rs.getString("fotoconsmcero"));
    empresasRequest.setLecturas_tiemporeal(rs.getString("lecturas_tiemporeal"));
    empresasRequest.setMin_espera_enviolect(rs.getString("min_espera_enviolect"));	
    empresasRequest.setValidargpsMovil(rs.getInt("validargpsMovil"));	
    empresasRequest.setImgobligatorio(rs.getString("imgobligatorio"));
    empresasRequest.setImgcat(rs.getString("imgcat"));
    empresasRequest.setRutadescargaapp(rs.getString("rutadescargaapp"));
    empresasRequest.setVersionapp(rs.getString("versionapp"));

    
    
    
    return empresasRequest;
  }
}
