export const formatPath = (path, data) => {
    let url = path;
    for (const k of Object.keys(data)) {
        url = url.replace(":" + k, data[k]);
    }
    return url;
};

export const Paths = Object.freeze({
     //Configuracion
    events_calendar : "/events/calendar",

});