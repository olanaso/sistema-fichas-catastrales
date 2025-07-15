package com.servicio.datos.repository.Fcatastro;

import com.servicio.datos.model.Fcatastro.*;
import com.servicio.datos.rowmapper.Fcatastro.ListaOfflineRowMaper;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ListaOfflineRepository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  
  public List<ListaOfflineRequest> genera_listaCorte(ListaOfflineRequest cliente) {
  
	  //String sql = "exec dbo.usp_genera_listaCatastroAPP '" + cliente.getCodemp()+ "','" + cliente.getCodsede()+ "','" + cliente.getCodins()+ "','" + cliente.getTipodescarga()+ "'";
	  
	  String sql = "SELECT * FROM fichacatastral.usp_genera_listacatastroapp '" + cliente.getCodemp()+ "','" + cliente.getCodsede()+ "','" + cliente.getCodins()+ "','" + cliente.getTipodescarga()+ "'";

	  
	  
    
    List<ListaOfflineRequest> rows = this.jdbcTemplate.query(sql.toString(), (RowMapper)new ListaOfflineRowMaper());
    return rows;
  }
}
