package com.servicio.datos.repository;

import com.servicio.datos.model.EmpresasRequest;
import com.servicio.datos.rowmapper.EmpresasRowMaper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class EmpresasRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<EmpresasRequest> ObtenerEmpresas(EmpresasRequest empresas) {
    String query = "select codemp, nombre as empresa,ruc, direccion,min_espera_lectura,(select valorporc from fichacatastral.paramae where codemp = '001' and codpar = 'LEC' and tippar = 'PORMNR' and tipvalor = 'valorporc')as porminprom,"
    		+ "(select valorstring from fichacatastral.paramae WHERE codemp='001' AND codpar='OGS' AND tippar='IMGCAT')as imgcat, ccodeps, fotoconsmcero,lecturas_tiemporeal,min_espera_enviolect,validargpsMovil,imgobligatorio,rutadescargaapp,versionapp from fichacatastral.empresas";

    List<EmpresasRequest> rows = this.jdbcTemplate.query(query, (RowMapper)new EmpresasRowMaper());
    return rows;
  }
}
