export const formatPath = (path, data) => {
    let url = path;
    for (const k of Object.keys(data)) {
        url = url.replace(":" + k, data[k]);
    }
    return url;
};

export const Paths = Object.freeze({
     //Configuracion
    contacto : "/contacto",

    //Contacto
    contacto_contacto : "/contacto/contact",
    contacto_contacto_add : "/contacto/contact/add",
    contacto_contacto_edit : "/contacto/contact/:id/edit",
    contacto_contacto_delete : "/contacto/contact/:id/delete",

    //Direccion
    contacto_direccion : "/contacto/direccion",
    contacto_direccion_add : "/contacto/direccion/add",
    contacto_direccion_edit : "/contacto/direccion/:id/edit",
    contacto_direccion_delete : "/contacto/direccion/:id/delete",





});