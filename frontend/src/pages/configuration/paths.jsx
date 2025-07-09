export const formatPath = (path, data) => {
    let url = path;
    for (const k of Object.keys(data)) {
        url = url.replace(":" + k, data[k]);
    }
    return url;
};

export const Paths = Object.freeze({
     //Configuracion
    config : "/config",
    config_entidad : "/config/entidades",
    config_entidad_add : "/config/entidades/add",
    config_entidad_edit : "/config/entidades/:id/edit",
    config_entidad_delete : "/config/entidades/:id/delete",

    //Estado Configuracion
    config_estado_config : "/config/estado-configuracion",
    config_estado_config_add : "/config/estado-configuracion/add",
    config_estado_config_edit : "/config/estado-configuracion/:id/edit",
    config_estado_config_delete : "/config/estado-configuracion/:id/delete",

    //Producto
    config_producto : "/config/producto",
    config_producto_add : "/config/producto/add",
    config_producto_edit : "/config/producto/:id/edit",
    config_producto_delete : "/config/producto/:id/delete",

    //Satelites
    config_satelite : "/config/satelite",
    config_satelite_add : "/config/satelite/add",
    config_satelite_edit : "/config/satelite/:id/edit",
    config_satelite_delete : "/config/satelite/:id/delete",

    //Sensor
    config_sensor : "/config/sensor",
    config_sensor_add : "/config/sensor/add",
    config_sensor_edit : "/config/sensor/:id/edit",
    config_sensor_delete : "/config/sensor/:id/delete",


    //Sensor remoto
    config_sensor_remoto : "/config/sensor-remoto",
    config_sensor_remoto_add : "/config/sensor-remoto/add",
    config_sensor_remoto_edit : "/config/sensor-remoto/:id/edit",
    config_sensor_remoto_delete : "/config/sensor-remoto/:id/delete",

    //Tipo Emergencia
    config_tipo_emergencia : "/config/tipo_emergencia",
    config_tipo_emergencia_add : "/config/tipo_emergencia/add",
    config_tipo_emergencia_edit : "/config/tipo_emergencia/:id/edit",
    config_tipo_emergencia_delete : "/config/tipo_emergencia/:id/delete",

    //Event
    config_calendar : "/config/events/calendar",



});