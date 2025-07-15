package com.servicio.datos.repository;

import com.servicio.datos.model.EmpresaRequest;
import com.servicio.datos.model.EmpresaResponse;
import com.servicio.datos.rowmapper.EmpresaRowMapper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class EmpresaRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public EmpresaResponse empresa(EmpresaRequest empresa) {
    StringBuilder sql = new StringBuilder();
    sql.append(" DECLARE @ACEPTAR varchar(2) ");
    sql.append(" SET @ACEPTAR = ((SELECT (case when valorlogico = 1 then 'NO' else 'SI' end ) FROM paramae ");
    sql.append(" WHERE codemp='001' AND codpar='WEB' AND tippar='WEBAPP')) ");
    sql.append(" select codemp,nombre,direccion,ruc,coddpto,telefono,ccodeps,website,latitud,longitud,'rutaFicha'=(SELECT valorstring FROM paramae  where codpar = 'OGS' and tippar = 'IPRWEB'), ");
    sql.append(" 'aceptar' = (CASE WHEN @ACEPTAR = 'NO' THEN  (case when ( convert(time, getdate()) >= horaini and convert(time, getdate()) <= horafin )  ");
    sql.append(" and Datepart(weekday, getdate()) NOT IN ( 1 , 7 )  THEN 'SI' ELSE 'NO' END ) ELSE 'SI' END ) , ipwebapp ");
    sql.append(" from ");
    sql.append(" empresas ");
 
    
    
    System.out.println("Query a ejecutar:" + sql.toString());
    List<EmpresaResponse> rows = this.jdbcTemplate.query(sql.toString(), (RowMapper)new EmpresaRowMapper());
    return rows.get(0);
  }
}
