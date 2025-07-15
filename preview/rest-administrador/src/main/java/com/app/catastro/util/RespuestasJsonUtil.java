package com.app.catastro.util;

import org.json.JSONObject;

import com.app.catastro.model.utils.AtributosJSON;




public class RespuestasJsonUtil {

    public String noToken(JSONObject json) {
        json.put(AtributosJSON.RESPONSE.toString(), RespuestasJSON.NO_TOKEN);
        json.put(AtributosJSON.DATA.toString(), "");
        return json.toString();
    }

    public String tokenNoEncontrado(JSONObject json) {
        json.put(AtributosJSON.RESPONSE.toString(), RespuestasJSON.TOKEN_NO_ENCONTRADO);
        json.put(AtributosJSON.DATA.toString(), "");
        return json.toString();
    }

    public String devolverRespuesta(JSONObject json, String respuesta) {
        json.put(AtributosJSON.RESPONSE.toString(), RespuestasJSON.EXITO);
        json.put(AtributosJSON.DATA.toString(), respuesta);
        return json.toString();
    }
}
