export const formatPath = (path, data) => {
    let url = path;
    for (const k of Object.keys(data)) {
        url = url.replace(":" + k, data[k]);
    }
    return url;
};

export const Paths = Object.freeze({
     //Configuracion
    emergencia : "/emergencia",
    emergencia_listar : "/emergencia/list",
    emergencia_add : "/emergencia/add",
    emergencia_programacion : "/emergencia/:id/analisis-geografico",
    emergencia_envio : "/emergencia/:id/envio",
    emergencia_seguimiento : "/emergencia/:id/seguimiento",
    emergencia_edit : "/emergencia/:id/edit",
    emergencia_delete : "/emergencia/:id/delete",





});