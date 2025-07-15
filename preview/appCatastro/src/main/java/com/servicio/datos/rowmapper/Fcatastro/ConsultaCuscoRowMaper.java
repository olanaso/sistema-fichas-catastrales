package com.servicio.datos.rowmapper.Fcatastro;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import java.lang.reflect.Field;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.servicio.datos.model.Fcatastro.FichaCatastralCuscoResponse;
import com.servicio.datos.model.Fcatastro.FichaCatastralResponse;

public class ConsultaCuscoRowMaper implements RowMapper {
	
	public FichaCatastralCuscoResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
        FichaCatastralCuscoResponse fichaCatastralCuscoResponse = new FichaCatastralCuscoResponse();


        Field[] fields = FichaCatastralCuscoResponse.class.getDeclaredFields();

        for (Field field : fields) {
            field.setAccessible(true); 
            try {
                String columnName = field.getName(); 

                if (field.getType() == int.class || field.getType() == Integer.class) {
                    field.set(fichaCatastralCuscoResponse, rs.getInt(columnName));
                } else if (field.getType() == double.class || field.getType() == Double.class) {
                    field.set(fichaCatastralCuscoResponse, rs.getDouble(columnName));
                } else if (field.getType() == boolean.class || field.getType() == Boolean.class) {
                    field.set(fichaCatastralCuscoResponse, rs.getBoolean(columnName));
                } else if (field.getType() == long.class || field.getType() == Long.class) {
                    field.set(fichaCatastralCuscoResponse, rs.getLong(columnName));
                } else if (field.getType() == float.class || field.getType() == Float.class) {
                    field.set(fichaCatastralCuscoResponse, rs.getFloat(columnName));
                } else if (field.getType() == java.util.Date.class) {
                    field.set(fichaCatastralCuscoResponse, rs.getDate(columnName));
                } else {
                  
                    field.set(fichaCatastralCuscoResponse, rs.getString(columnName));
                }
            } catch (SQLException e) {
                System.err.println("Campo no encontrado en el ResultSet: " + field.getName());
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return fichaCatastralCuscoResponse;
    }
}
