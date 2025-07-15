package com.app.catastro.repository.catastro;


import org.postgresql.util.PGobject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.*;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;
import org.xml.sax.SAXException;

import com.app.catastro.interfaces.catastro.IFichaCatastroMovil;
import com.app.catastro.master.IGenericRepo;
import com.app.catastro.model.catastro.AsignacionFicha;
import com.app.catastro.model.catastro.ReportFichaMovil;
import com.app.catastro.model.catastro.ReportFichaMovilCusco;
import com.app.catastro.model.catastro.TarifasApp;
import com.app.catastro.model.catastro.excelCargaRequest;
import com.app.catastro.model.catastro.excelCargaResponse;
import com.app.catastro.model.catastro.fichaCatrastroMovil;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.ParserConfigurationException;

@Repository
public class IFichaCatrastroMovilRepo  extends IGenericRepo implements IFichaCatastroMovil {

	@Override
	public List<fichaCatrastroMovil> listar(String user, String pass)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String crud(fichaCatrastroMovil obj, int op, String user, String pass)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
				return pass;

	}

	@Override
	public fichaCatrastroMovil buscar(String codemp, String codsuc, String codigo, String user, String pass)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public List<fichaCatrastroMovil> listarImagenes(String usuario, String password, fichaCatrastroMovil ficha)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		  String sql = "SELECT * FROM fichacatastral.fichacatastro_eps where idficha="+ficha.getCodcliente()+"";
		    return this.jTemplateCatastro(usuario,password).query(sql.toString(),new BeanPropertyRowMapper<fichaCatrastroMovil>(fichaCatrastroMovil.class));

	}



	@Override
	public List<fichaCatrastroMovil> listaGeneralCusco(String usuario, String password, fichaCatrastroMovil ficha)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {	
		String query = " SELECT "
				+ "    codsuc, "
				+ "    (SELECT nombre FROM fichacatastral.sucursales WHERE sucursales.codsuc = fichacatastro_eps.codsuc) AS distrito, "
				+ "    inspector, "
				+ "    (SELECT nombres FROM fichacatastral.inspectores WHERE inspectores.codinspector = fichacatastro_eps.inspector) AS trabajador, "
				+ "    COUNT(codcliente) AS cantidad, "
				+ "    MAX(fechareg) AS ultimo_registro  "
				+ "FROM fichacatastro_eps  "
				+ "WHERE inspector LIKE '"+ficha.getInspector()+"' "
				+ "    AND codbrigada LIKE '"+ficha.getCodbrigada()+"' "
				+ "    AND fechareg::DATE >= '"+ficha.getFechaini()+"'::DATE "
				+ "    AND estareg = '1' "
				+ "    AND fechareg::DATE <= '"+ficha.getFechafin()+"'::DATE "
				+ "GROUP BY codsuc, inspector   ";
		
		return this.jTemplateCatastro(usuario, password).query(query, new BeanPropertyRowMapper<fichaCatrastroMovil>(fichaCatrastroMovil.class));

	}

	@Override
	public List<fichaCatrastroMovil> graficoTotalCusco(String usuario, String password, fichaCatrastroMovil ficha)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		String sql ="SELECT * FROM fichacatastral.resumenfichacatastro_031('"+ficha.getCodempre()+"','"+ficha.getCodsuc()+"','"+ficha.getCodsector()+"','"+ficha.getInspector()+"','"+ficha.getFechaini()+"','"+ficha.getFechafin()+"','"+ficha.getCodbrigada()+"')";
		
		return this.jTemplateCatastro(usuario,password).query(sql.toString(),new BeanPropertyRowMapper<fichaCatrastroMovil>(fichaCatrastroMovil.class));

	}

	@Override
	public List<fichaCatrastroMovil> notificaciones(String usuario, String password, fichaCatrastroMovil ficha)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		String sql ="SELECT * FROM fichacatastral.web_listadoacccomercial ('"+ficha.getCodempre()+"','"+ficha.getCodsuc()+"','"+ficha.getCodsector()+"','"+ficha.getInspector()+"','"+ficha.getFechaini()+"','"+ficha.getFechafin()+"','"+ficha.getCodbrigada()+"')";	
		return this.jTemplateCatastro(usuario,password).query(sql.toString(),new BeanPropertyRowMapper<fichaCatrastroMovil>(fichaCatrastroMovil.class));

	}

	@Override
	public List<TarifasApp> tarifasAPP(String usuario, String password, TarifasApp tarifas)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {

		String sql = "select * from fichacatastral.fichacatastro_epsuniduso where codcliente="+tarifas.getCodcliente()+" AND idficha="+tarifas.getIdficha()+"";

		return this.jTemplateCatastro(usuario,password).query(sql,new BeanPropertyRowMapper<TarifasApp>(TarifasApp.class));
	}

	@Override
	public List<TarifasApp> tarifasPDF(String user, String pass, int idficha)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		
		String sql = " SELECT DISTINCT ep_un.tarifa,ep_un.actividad, ep_un.razonsocial, ep_un.referencia,trf.nomtar as descripcion_tarifa , tp_ac.descripcion as descripcion_actividad "
				+ " FROM fichacatastral.fichacatastro_epsuniduso AS ep_un "
				+ " LEFT JOIN fichacatastral.tipoactividad AS tp_ac "
				+ " ON ep_un.actividad = tp_ac.actividad "
				+ " LEFT JOIN fichacatastral.tarifas AS trf "
				+ " ON ep_un.tarifa = trf.catetar "
				+ " WHERE ep_un.idficha="+idficha+" ";
		
		return this.jTemplateCatastro(user,pass).query(sql,new BeanPropertyRowMapper<TarifasApp>(TarifasApp.class));
	}

	

	@Override
	public List<ReportFichaMovilCusco> listarReporteCusco(String usuario, String password,
			ReportFichaMovilCusco fichaCusco)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		String sql = "SELECT * FROM fichacatastral.web_listafichacatastro_031('"+fichaCusco.getCodempre()+"','"+fichaCusco.getCodsuc()+"','"+fichaCusco.getCodsector()+"','"+fichaCusco.getInspector()+"','"+fichaCusco.getFechaini()+"','"+fichaCusco.getFechafin()+"','"+fichaCusco.getCodbrigada()+"')";

		return this.jTemplateCatastro(usuario,password).query(sql,new BeanPropertyRowMapper<ReportFichaMovilCusco>(ReportFichaMovilCusco.class));

	}


	@Override
	public ReportFichaMovilCusco fichaCusco(int objectID, String usuario, String password)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		
		  String sql=" SELECT *FROM fichacatastral.view_fichacatastro_031 WHERE objectID ="+ objectID+" ";
		  return this.jTemplateCatastro(usuario,password).queryForObject(sql.toString(),new BeanPropertyRowMapper<ReportFichaMovilCusco>(ReportFichaMovilCusco.class));
	}

	@Override
	public List<AsignacionFicha> listarAsignacion(String usuario, String password, AsignacionFicha asignacionficha)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		String sql = "SELECT * FROM fichacatastral.web_listadoasignacioncatas ('001','"+asignacionficha.getCodsuc()+"','"+asignacionficha.getCodsector()+"','"+asignacionficha.getCodurbaso()+"')";
		 
		  return this.jTemplateCatastro(usuario,password).query(sql.toString(),new BeanPropertyRowMapper<AsignacionFicha>(AsignacionFicha.class));

	}

	@Override
	public List<excelCargaResponse> reportCarga(String usuario, String password, excelCargaRequest excel)
			throws DataAccessException, SAXException, IOException, ParserConfigurationException {
		
		String sql = "SELECT * from fichacatastral.grid_asignacionot ('"+excel.getCodemp()+"')";
		return this.jTemplateCatastro(usuario,password).query(sql,new BeanPropertyRowMapper<excelCargaResponse>(excelCargaResponse.class));

	}
	
	
	public String crudTarifas(TarifasApp tarifas, int op, String user, String pass) throws DataAccessException, SAXException, IOException, ParserConfigurationException {
    	List<SqlParameter> parameters =
    			Arrays.asList(
    					new SqlParameter(Types.VARCHAR), 
    					new SqlParameter(Types.INTEGER),
    					new SqlParameter(Types.VARCHAR), 
    			        new SqlParameter(Types.VARCHAR),
    			        new SqlParameter(Types.VARCHAR), 
    			        new SqlParameter(Types.VARCHAR), 
    			        new SqlParameter(Types.INTEGER),
    			        new SqlParameter(Types.INTEGER),
    					new SqlOutParameter("mensaje", Types.VARCHAR));
  
    	Map<String, Object> f = this.jTemplateCatastro(user, pass).call(con ->{
        	
            CallableStatement callableStatement = con.prepareCall("{call fichacatastral.usp_web_gestion_tarifas (?,?,?,?,?,?,?,?,?)}");
       
            callableStatement.setString(1, tarifas.getCodemp());
            callableStatement.setInt(2, tarifas.getCodcliente());
            callableStatement.setString(3, tarifas.getTarifa());
            callableStatement.setString(4, tarifas.getActividad());
            callableStatement.setString(5, tarifas.getRazonsocial());
            callableStatement.setString(6,tarifas.getReferencia());
            callableStatement.setInt(7, tarifas.getIdficha());
            callableStatement.setInt(8, op);
            callableStatement.registerOutParameter(9, Types.VARCHAR);
            return callableStatement;
        }, parameters);

        return (String) f.get("mensaje");
    }
	
	
	@Override
	public String crudapp(String json, String usuario, String password)
	        throws DataAccessException, SAXException, IOException, ParserConfigurationException {


	    JdbcTemplate jdbcTemplate = this.jTemplateCatastro(usuario, password);

	    Map<String, Object> result = jdbcTemplate.call(new CallableStatementCreator() {
	        @Override
	        public CallableStatement createCallableStatement(Connection con) throws SQLException {
	            CallableStatement cs = con.prepareCall("{ call fichacatastral.gestion_consultaficha(?, ?) }");
	            cs.setObject(1, json, Types.OTHER);       
	            cs.registerOutParameter(2, Types.VARCHAR); 
	            return cs;
	        }
	    }, Arrays.asList(
	        new SqlParameter("json", Types.OTHER),
	        new SqlOutParameter("mensaje", Types.VARCHAR)
	    ));

	    return  (String) result.get("mensaje");
	}
}


  
