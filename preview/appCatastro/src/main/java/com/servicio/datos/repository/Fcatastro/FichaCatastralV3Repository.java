package com.servicio.datos.repository.Fcatastro;

import com.servicio.datos.model.Fcatastro.*;
import com.servicio.datos.rowmapper.Fcatastro.ConsultaRowMaper;
import com.servicio.datos.rowmapper.Fcatastro.FichaCatastralRowMaper;
import com.servicio.datos.rowmapper.Fcatastro.FichaCatastralV2RowMaper;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class FichaCatastralV3Repository {
  @Autowired
  @Qualifier("jdbcMaster")
  private JdbcTemplate jdbcTemplate;
  

public ConsultaFichaCatastralV2Response ConsultaFichaV3(String valor,int tipo) {
	
	   
    String sql = "SELECT * FROM fichacatastral.usp_app_infoclientecatasv3 ('" +valor+ "' ,"+ tipo+" ) ";
	
	//String sql = "SELECT * from fichacatastral.usp_genera_listaCatastroAPP ('001', '001', '001', '1') ";
    
	
	/*SELECT fichacatastral.usp_app_infoclientecatasv3(
			'320000',
			1
		)
    */
    
    System.out.print(sql);	  
    List<ConsultaFichaCatastralV2Response> rows = this.jdbcTemplate.query(sql.toString(), (RowMapper)new FichaCatastralV2RowMaper());
    return rows.get(0);
}
}
