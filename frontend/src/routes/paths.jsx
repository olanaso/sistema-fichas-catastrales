export const formatPath = (path, data) => {
    let url = path;
    for (const k of Object.keys(data)) {
      url = url.replace(":" + k, data[k]);
    }
    return url;
  };

export const Paths ={
    //Principales
    base : "/",
    notFound : "/not-found",
    //Login
    login : "/login",
    loading : "/loading",
    //Calendario
    calendar : "/events",

    //Configuracion
    config : "/config",

    //Configuracion
    emergencia : "/emergencia",
    //Configuracion
    analisisgeografico : "/analisis-geografico",


    //apuntar a los contactos
    contacto : "/contacto",

    //apuntar al dashboard con power BI
    dashboard : "/dashboard",
    //genstion de los usuarios
    usuarios : "/usuarios",

    /*
    // Namespaces
    namespaceList : "/namespaces",
    // Companies
    companyList_empty : "/ns-company/select-namespace",
    companyList : "/ns-company/:namespaceId/companies",
    newCompany : "/ns-company/:namespaceId/companies/~new",
    editCompany : "/ns-company/:namespaceId/companies/:companyId",
    editCompany_overview : "/ns-company/:namespaceId/companies/:companyId/overview",
    editCompany_details : "/ns-company/:namespaceId/companies/:companyId/details",
    editCompany_keys : "/ns-company/:namespaceId/companies/:companyId/keys",
    editCompany_keys_new : "/ns-company/:namespaceId/companies/:companyId/keys/:providerId/~new",
    editCompany_keys_edit : "/ns-company/:namespaceId/companies/:companyId/keys/:providerId/:componentId",
    // Documents
    documentList_empty : "/ns-document/select-company",
    documentList : "/ns-document/:namespaceId/documents",
    uploadDocument : "/ns-document/:namespaceId/documents/~upload",
    */
  };