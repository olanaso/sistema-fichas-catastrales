package org.catastro.sistemafichacatastral.fichacatastral;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FichaCatastro {

    private String region;
    private String sucursal;
    private String sector;
    private String mzna;
    private String lote;
    private String sublote;
    private String suministro;
    private String calle;
    private String cuadra;
    private String nromuni;
    private String mzmuni;
    private String ltmuni;
    private String urbanizacion;
    private String tipoconstruccion;
    private String nropisos;
    private String tiposervicio_campo;
    private String abastecimiento;
    private String piscina;
    private String almacenaje;
    private String tipousuario;
    private String apellidosnombre_campo;
    private String dni;
    private String habitantes;
    private String tiporesponsable;
    private String telefono;
    private String nrocontrato;
    private String reservorio;
    private String sectabastecimiento;
    private String categoriascampo;
    private String actividades;
    private String razonsocial;
    private String estservicio_a;
    private String pavimento_a;
    private String vereda_a;
    private String diametrocampo_a;
    private String materialtubo_a;
    private String tipoingreso_a;
    private String caja_a;
    private String materialcaja_a;
    private String localizacion_a;
    private String estadocaja_a;
    private String tapa_a;
    private String materialtapa_a;
    private String estadotapa_a;
    private String llaves;
    private String posicionmedidor;
    private String tipocorte_a;
    private String razoncorte;
    private String fugas_a;
    private String tipocajaobserv_a;
    private String tienemedidor;
    private String medidorcampo;
    private String modelomedidor;
    private String anio;
    private String lecturamedidor;
    private String fechainstalacion;
    private String marcamedidor;
    private String diametromedidor;
    private String lectura;
    private String tipofacturacion;
    private String tipolectura;
    private String estadomedidor;
    private String medidoroperativo;
    private String estservicio_d;
    private String diametrocampo_d;
    private String materialtubo_d;
    private String caja_d;
    private String materialcaja_d;
    private String localizacion_d;
    private String estadocaja_d;
    private String tapa_d;
    private String tipotapa_d;
    private String estadotapa_d;
    private String fugas_d;
    private String horasxdia;
    private String diasxsemana;
    private String presionagu;
    private String nrolavatorios;
    private String estadolavatorios;
    private String nrolavadoras;
    private String estadolavadoras;
    private String nrowater;
    private String estadowater;
    private String nroduchas;
    private String estadoduchas;
    private String nrourinarios;
    private String estadourinarios;
    private String nrogrifos;
    private String estadogrifos;
    private String nropiscina;
    private String estadopiscina;
    private String nrotanquecisterna;
    private String estadotanquecisterna;
    private String nrotanqueelevado;
    private String estadotanqueelevado;
    private String observacion;
    private String fichaincompleta;
    private String tipoacccomercial;
    private String encuestador;
    private String fecencuestador;
    private String calidad;
    private String feccalidad;
    private String supervisor;
    private String fecsupervisor;
    private String supervision;
    private String fecsupervision;
    private String objectid;
    private String posicionx;
    private String posiciony;
    private String usermodificador;
    private String fechamodificacion;
    private String codcatastral;
    private String coddist;
    private String codsector_new;
    private String codmza_new;
    private String nrolote_new;
    private String nrosublote_new;
    private String propietario;
    private String fecha;
    private String fotofachada;
    private String fotocajaagua;
    private String fotocajadesague;
    private String nromed_sistema;
    private String medidalotefrente;
    private String medidaejeagua;
    private String medidaejedesague;
    private String fichaaprobada;
    private String fechaaprobacion;
    private String codcalle;
    private String codurbaso;
    private String actividad;
    private String catetar;
    private String desactividad;
    private String descatetar;
    private String unidades_uso;
    private String fotodetalle4;
    private String fotodetalle5;


    @JsonProperty("list_fichacatastro_epsuniduso")
    private List<FichaCatastroEpsUnidUso> list_fichacatastro_epsuniduso;

    public List<FichaCatastroEpsUnidUso> getList_fichacatastro_epsuniduso() {
        return list_fichacatastro_epsuniduso;
    }

    public void setList_fichacatastro_epsuniduso(List<FichaCatastroEpsUnidUso> list_fichacatastro_epsuniduso) {
        this.list_fichacatastro_epsuniduso = list_fichacatastro_epsuniduso;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getSucursal() {
        return sucursal;
    }

    public void setSucursal(String sucursal) {
        this.sucursal = sucursal;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getMzna() {
        return mzna;
    }

    public void setMzna(String mzna) {
        this.mzna = mzna;
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }

    public String getSublote() {
        return sublote;
    }

    public void setSublote(String sublote) {
        this.sublote = sublote;
    }

    public String getSuministro() {
        return suministro;
    }

    public void setSuministro(String suministro) {
        this.suministro = suministro;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String getCuadra() {
        return cuadra;
    }

    public void setCuadra(String cuadra) {
        this.cuadra = cuadra;
    }

    public String getNromuni() {
        return nromuni;
    }

    public void setNromuni(String nromuni) {
        this.nromuni = nromuni;
    }

    public String getMzmuni() {
        return mzmuni;
    }

    public void setMzmuni(String mzmuni) {
        this.mzmuni = mzmuni;
    }

    public String getLtmuni() {
        return ltmuni;
    }

    public void setLtmuni(String ltmuni) {
        this.ltmuni = ltmuni;
    }

    public String getUrbanizacion() {
        return urbanizacion;
    }

    public void setUrbanizacion(String urbanizacion) {
        this.urbanizacion = urbanizacion;
    }

    public String getTipoconstruccion() {
        return tipoconstruccion;
    }

    public void setTipoconstruccion(String tipoconstruccion) {
        this.tipoconstruccion = tipoconstruccion;
    }

    public String getNropisos() {
        return nropisos;
    }

    public void setNropisos(String nropisos) {
        this.nropisos = nropisos;
    }

    public String getTiposervicio_campo() {
        return tiposervicio_campo;
    }

    public void setTiposervicio_campo(String tiposervicio_campo) {
        this.tiposervicio_campo = tiposervicio_campo;
    }

    public String getAbastecimiento() {
        return abastecimiento;
    }

    public void setAbastecimiento(String abastecimiento) {
        this.abastecimiento = abastecimiento;
    }

    public String getPiscina() {
        return piscina;
    }

    public void setPiscina(String piscina) {
        this.piscina = piscina;
    }

    public String getAlmacenaje() {
        return almacenaje;
    }

    public void setAlmacenaje(String almacenaje) {
        this.almacenaje = almacenaje;
    }

    public String getTipousuario() {
        return tipousuario;
    }

    public void setTipousuario(String tipousuario) {
        this.tipousuario = tipousuario;
    }

    public String getApellidosnombre_campo() {
        return apellidosnombre_campo;
    }

    public void setApellidosnombre_campo(String apellidosnombre_campo) {
        this.apellidosnombre_campo = apellidosnombre_campo;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getHabitantes() {
        return habitantes;
    }

    public void setHabitantes(String habitantes) {
        this.habitantes = habitantes;
    }

    public String getTiporesponsable() {
        return tiporesponsable;
    }

    public void setTiporesponsable(String tiporesponsable) {
        this.tiporesponsable = tiporesponsable;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getNrocontrato() {
        return nrocontrato;
    }

    public void setNrocontrato(String nrocontrato) {
        this.nrocontrato = nrocontrato;
    }

    public String getReservorio() {
        return reservorio;
    }

    public void setReservorio(String reservorio) {
        this.reservorio = reservorio;
    }

    public String getSectabastecimiento() {
        return sectabastecimiento;
    }

    public void setSectabastecimiento(String sectabastecimiento) {
        this.sectabastecimiento = sectabastecimiento;
    }

    public String getCategoriascampo() {
        return categoriascampo;
    }

    public void setCategoriascampo(String categoriascampo) {
        this.categoriascampo = categoriascampo;
    }

    public String getActividades() {
        return actividades;
    }

    public void setActividades(String actividades) {
        this.actividades = actividades;
    }

    public String getRazonsocial() {
        return razonsocial;
    }

    public void setRazonsocial(String razonsocial) {
        this.razonsocial = razonsocial;
    }

    public String getEstservicio_a() {
        return estservicio_a;
    }

    public void setEstservicio_a(String estservicio_a) {
        this.estservicio_a = estservicio_a;
    }

    public String getPavimento_a() {
        return pavimento_a;
    }

    public void setPavimento_a(String pavimento_a) {
        this.pavimento_a = pavimento_a;
    }

    public String getVereda_a() {
        return vereda_a;
    }

    public void setVereda_a(String vereda_a) {
        this.vereda_a = vereda_a;
    }

    public String getDiametrocampo_a() {
        return diametrocampo_a;
    }

    public void setDiametrocampo_a(String diametrocampo_a) {
        this.diametrocampo_a = diametrocampo_a;
    }

    public String getMaterialtubo_a() {
        return materialtubo_a;
    }

    public void setMaterialtubo_a(String materialtubo_a) {
        this.materialtubo_a = materialtubo_a;
    }

    public String getTipoingreso_a() {
        return tipoingreso_a;
    }

    public void setTipoingreso_a(String tipoingreso_a) {
        this.tipoingreso_a = tipoingreso_a;
    }

    public String getCaja_a() {
        return caja_a;
    }

    public void setCaja_a(String caja_a) {
        this.caja_a = caja_a;
    }

    public String getMaterialcaja_a() {
        return materialcaja_a;
    }

    public void setMaterialcaja_a(String materialcaja_a) {
        this.materialcaja_a = materialcaja_a;
    }

    public String getLocalizacion_a() {
        return localizacion_a;
    }

    public void setLocalizacion_a(String localizacion_a) {
        this.localizacion_a = localizacion_a;
    }

    public String getEstadocaja_a() {
        return estadocaja_a;
    }

    public void setEstadocaja_a(String estadocaja_a) {
        this.estadocaja_a = estadocaja_a;
    }

    public String getTapa_a() {
        return tapa_a;
    }

    public void setTapa_a(String tapa_a) {
        this.tapa_a = tapa_a;
    }

    public String getMaterialtapa_a() {
        return materialtapa_a;
    }

    public void setMaterialtapa_a(String materialtapa_a) {
        this.materialtapa_a = materialtapa_a;
    }

    public String getEstadotapa_a() {
        return estadotapa_a;
    }

    public void setEstadotapa_a(String estadotapa_a) {
        this.estadotapa_a = estadotapa_a;
    }

    public String getLlaves() {
        return llaves;
    }

    public void setLlaves(String llaves) {
        this.llaves = llaves;
    }

    public String getPosicionmedidor() {
        return posicionmedidor;
    }

    public void setPosicionmedidor(String posicionmedidor) {
        this.posicionmedidor = posicionmedidor;
    }

    public String getTipocorte_a() {
        return tipocorte_a;
    }

    public void setTipocorte_a(String tipocorte_a) {
        this.tipocorte_a = tipocorte_a;
    }

    public String getRazoncorte() {
        return razoncorte;
    }

    public void setRazoncorte(String razoncorte) {
        this.razoncorte = razoncorte;
    }

    public String getFugas_a() {
        return fugas_a;
    }

    public void setFugas_a(String fugas_a) {
        this.fugas_a = fugas_a;
    }

    public String getTipocajaobserv_a() {
        return tipocajaobserv_a;
    }

    public void setTipocajaobserv_a(String tipocajaobserv_a) {
        this.tipocajaobserv_a = tipocajaobserv_a;
    }

    public String getTienemedidor() {
        return tienemedidor;
    }

    public void setTienemedidor(String tienemedidor) {
        this.tienemedidor = tienemedidor;
    }

    public String getMedidorcampo() {
        return medidorcampo;
    }

    public void setMedidorcampo(String medidorcampo) {
        this.medidorcampo = medidorcampo;
    }

    public String getModelomedidor() {
        return modelomedidor;
    }

    public void setModelomedidor(String modelomedidor) {
        this.modelomedidor = modelomedidor;
    }

    public String getAnio() {
        return anio;
    }

    public void setAnio(String anio) {
        this.anio = anio;
    }

    public String getLecturamedidor() {
        return lecturamedidor;
    }

    public void setLecturamedidor(String lecturamedidor) {
        this.lecturamedidor = lecturamedidor;
    }

    public String getFechainstalacion() {
        return fechainstalacion;
    }

    public void setFechainstalacion(String fechainstalacion) {
        this.fechainstalacion = fechainstalacion;
    }

    public String getMarcamedidor() {
        return marcamedidor;
    }

    public void setMarcamedidor(String marcamedidor) {
        this.marcamedidor = marcamedidor;
    }

    public String getDiametromedidor() {
        return diametromedidor;
    }

    public void setDiametromedidor(String diametromedidor) {
        this.diametromedidor = diametromedidor;
    }

    public String getLectura() {
        return lectura;
    }

    public void setLectura(String lectura) {
        this.lectura = lectura;
    }

    public String getTipofacturacion() {
        return tipofacturacion;
    }

    public void setTipofacturacion(String tipofacturacion) {
        this.tipofacturacion = tipofacturacion;
    }

    public String getTipolectura() {
        return tipolectura;
    }

    public void setTipolectura(String tipolectura) {
        this.tipolectura = tipolectura;
    }

    public String getEstadomedidor() {
        return estadomedidor;
    }

    public void setEstadomedidor(String estadomedidor) {
        this.estadomedidor = estadomedidor;
    }

    public String getMedidoroperativo() {
        return medidoroperativo;
    }

    public void setMedidoroperativo(String medidoroperativo) {
        this.medidoroperativo = medidoroperativo;
    }

    public String getEstservicio_d() {
        return estservicio_d;
    }

    public void setEstservicio_d(String estservicio_d) {
        this.estservicio_d = estservicio_d;
    }

    public String getDiametrocampo_d() {
        return diametrocampo_d;
    }

    public void setDiametrocampo_d(String diametrocampo_d) {
        this.diametrocampo_d = diametrocampo_d;
    }

    public String getMaterialtubo_d() {
        return materialtubo_d;
    }

    public void setMaterialtubo_d(String materialtubo_d) {
        this.materialtubo_d = materialtubo_d;
    }

    public String getCaja_d() {
        return caja_d;
    }

    public void setCaja_d(String caja_d) {
        this.caja_d = caja_d;
    }

    public String getMaterialcaja_d() {
        return materialcaja_d;
    }

    public void setMaterialcaja_d(String materialcaja_d) {
        this.materialcaja_d = materialcaja_d;
    }

    public String getLocalizacion_d() {
        return localizacion_d;
    }

    public void setLocalizacion_d(String localizacion_d) {
        this.localizacion_d = localizacion_d;
    }

    public String getEstadocaja_d() {
        return estadocaja_d;
    }

    public void setEstadocaja_d(String estadocaja_d) {
        this.estadocaja_d = estadocaja_d;
    }

    public String getTapa_d() {
        return tapa_d;
    }

    public void setTapa_d(String tapa_d) {
        this.tapa_d = tapa_d;
    }

    public String getTipotapa_d() {
        return tipotapa_d;
    }

    public void setTipotapa_d(String tipotapa_d) {
        this.tipotapa_d = tipotapa_d;
    }

    public String getEstadotapa_d() {
        return estadotapa_d;
    }

    public void setEstadotapa_d(String estadotapa_d) {
        this.estadotapa_d = estadotapa_d;
    }

    public String getFugas_d() {
        return fugas_d;
    }

    public void setFugas_d(String fugas_d) {
        this.fugas_d = fugas_d;
    }

    public String getHorasxdia() {
        return horasxdia;
    }

    public void setHorasxdia(String horasxdia) {
        this.horasxdia = horasxdia;
    }

    public String getDiasxsemana() {
        return diasxsemana;
    }

    public void setDiasxsemana(String diasxsemana) {
        this.diasxsemana = diasxsemana;
    }

    public String getPresionagu() {
        return presionagu;
    }

    public void setPresionagu(String presionagu) {
        this.presionagu = presionagu;
    }

    public String getNrolavatorios() {
        return nrolavatorios;
    }

    public void setNrolavatorios(String nrolavatorios) {
        this.nrolavatorios = nrolavatorios;
    }

    public String getEstadolavatorios() {
        return estadolavatorios;
    }

    public void setEstadolavatorios(String estadolavatorios) {
        this.estadolavatorios = estadolavatorios;
    }

    public String getNrolavadoras() {
        return nrolavadoras;
    }

    public void setNrolavadoras(String nrolavadoras) {
        this.nrolavadoras = nrolavadoras;
    }

    public String getEstadolavadoras() {
        return estadolavadoras;
    }

    public void setEstadolavadoras(String estadolavadoras) {
        this.estadolavadoras = estadolavadoras;
    }

    public String getNrowater() {
        return nrowater;
    }

    public void setNrowater(String nrowater) {
        this.nrowater = nrowater;
    }

    public String getEstadowater() {
        return estadowater;
    }

    public void setEstadowater(String estadowater) {
        this.estadowater = estadowater;
    }

    public String getNroduchas() {
        return nroduchas;
    }

    public void setNroduchas(String nroduchas) {
        this.nroduchas = nroduchas;
    }

    public String getEstadoduchas() {
        return estadoduchas;
    }

    public void setEstadoduchas(String estadoduchas) {
        this.estadoduchas = estadoduchas;
    }

    public String getNrourinarios() {
        return nrourinarios;
    }

    public void setNrourinarios(String nrourinarios) {
        this.nrourinarios = nrourinarios;
    }

    public String getEstadourinarios() {
        return estadourinarios;
    }

    public void setEstadourinarios(String estadourinarios) {
        this.estadourinarios = estadourinarios;
    }

    public String getNrogrifos() {
        return nrogrifos;
    }

    public void setNrogrifos(String nrogrifos) {
        this.nrogrifos = nrogrifos;
    }

    public String getEstadogrifos() {
        return estadogrifos;
    }

    public void setEstadogrifos(String estadogrifos) {
        this.estadogrifos = estadogrifos;
    }

    public String getNropiscina() {
        return nropiscina;
    }

    public void setNropiscina(String nropiscina) {
        this.nropiscina = nropiscina;
    }

    public String getEstadopiscina() {
        return estadopiscina;
    }

    public void setEstadopiscina(String estadopiscina) {
        this.estadopiscina = estadopiscina;
    }

    public String getNrotanquecisterna() {
        return nrotanquecisterna;
    }

    public void setNrotanquecisterna(String nrotanquecisterna) {
        this.nrotanquecisterna = nrotanquecisterna;
    }

    public String getEstadotanquecisterna() {
        return estadotanquecisterna;
    }

    public void setEstadotanquecisterna(String estadotanquecisterna) {
        this.estadotanquecisterna = estadotanquecisterna;
    }

    public String getNrotanqueelevado() {
        return nrotanqueelevado;
    }

    public void setNrotanqueelevado(String nrotanqueelevado) {
        this.nrotanqueelevado = nrotanqueelevado;
    }

    public String getEstadotanqueelevado() {
        return estadotanqueelevado;
    }

    public void setEstadotanqueelevado(String estadotanqueelevado) {
        this.estadotanqueelevado = estadotanqueelevado;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public String getFichaincompleta() {
        return fichaincompleta;
    }

    public void setFichaincompleta(String fichaincompleta) {
        this.fichaincompleta = fichaincompleta;
    }

    public String getTipoacccomercial() {
        return tipoacccomercial;
    }

    public void setTipoacccomercial(String tipoacccomercial) {
        this.tipoacccomercial = tipoacccomercial;
    }

    public String getEncuestador() {
        return encuestador;
    }

    public void setEncuestador(String encuestador) {
        this.encuestador = encuestador;
    }

    public String getFecencuestador() {
        return fecencuestador;
    }

    public void setFecencuestador(String fecencuestador) {
        this.fecencuestador = fecencuestador;
    }

    public String getCalidad() {
        return calidad;
    }

    public void setCalidad(String calidad) {
        this.calidad = calidad;
    }

    public String getFeccalidad() {
        return feccalidad;
    }

    public void setFeccalidad(String feccalidad) {
        this.feccalidad = feccalidad;
    }

    public String getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(String supervisor) {
        this.supervisor = supervisor;
    }

    public String getFecsupervisor() {
        return fecsupervisor;
    }

    public void setFecsupervisor(String fecsupervisor) {
        this.fecsupervisor = fecsupervisor;
    }

    public String getSupervision() {
        return supervision;
    }

    public void setSupervision(String supervision) {
        this.supervision = supervision;
    }

    public String getFecsupervision() {
        return fecsupervision;
    }

    public void setFecsupervision(String fecsupervision) {
        this.fecsupervision = fecsupervision;
    }

    public String getObjectid() {
        return objectid;
    }

    public void setObjectid(String objectid) {
        this.objectid = objectid;
    }

    public String getPosicionx() {
        return posicionx;
    }

    public void setPosicionx(String posicionx) {
        this.posicionx = posicionx;
    }

    public String getPosiciony() {
        return posiciony;
    }

    public void setPosiciony(String posiciony) {
        this.posiciony = posiciony;
    }

    public String getUsermodificador() {
        return usermodificador;
    }

    public void setUsermodificador(String usermodificador) {
        this.usermodificador = usermodificador;
    }

    public String getFechamodificacion() {
        return fechamodificacion;
    }

    public void setFechamodificacion(String fechamodificacion) {
        this.fechamodificacion = fechamodificacion;
    }

    public String getCodcatastral() {
        return codcatastral;
    }

    public void setCodcatastral(String codcatastral) {
        this.codcatastral = codcatastral;
    }

    public String getCoddist() {
        return coddist;
    }

    public void setCoddist(String coddist) {
        this.coddist = coddist;
    }

    public String getCodsector_new() {
        return codsector_new;
    }

    public void setCodsector_new(String codsector_new) {
        this.codsector_new = codsector_new;
    }

    public String getCodmza_new() {
        return codmza_new;
    }

    public void setCodmza_new(String codmza_new) {
        this.codmza_new = codmza_new;
    }

    public String getNrolote_new() {
        return nrolote_new;
    }

    public void setNrolote_new(String nrolote_new) {
        this.nrolote_new = nrolote_new;
    }

    public String getNrosublote_new() {
        return nrosublote_new;
    }

    public void setNrosublote_new(String nrosublote_new) {
        this.nrosublote_new = nrosublote_new;
    }

    public String getPropietario() {
        return propietario;
    }

    public void setPropietario(String propietario) {
        this.propietario = propietario;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getFotofachada() {
        return fotofachada;
    }

    public void setFotofachada(String fotofachada) {
        this.fotofachada = fotofachada;
    }

    public String getFotocajaagua() {
        return fotocajaagua;
    }

    public void setFotocajaagua(String fotocajaagua) {
        this.fotocajaagua = fotocajaagua;
    }

    public String getFotocajadesague() {
        return fotocajadesague;
    }

    public void setFotocajadesague(String fotocajadesague) {
        this.fotocajadesague = fotocajadesague;
    }

    public String getNromed_sistema() {
        return nromed_sistema;
    }

    public void setNromed_sistema(String nromed_sistema) {
        this.nromed_sistema = nromed_sistema;
    }

    public String getMedidalotefrente() {
        return medidalotefrente;
    }

    public void setMedidalotefrente(String medidalotefrente) {
        this.medidalotefrente = medidalotefrente;
    }

    public String getMedidaejeagua() {
        return medidaejeagua;
    }

    public void setMedidaejeagua(String medidaejeagua) {
        this.medidaejeagua = medidaejeagua;
    }

    public String getMedidaejedesague() {
        return medidaejedesague;
    }

    public void setMedidaejedesague(String medidaejedesague) {
        this.medidaejedesague = medidaejedesague;
    }

    public String getFichaaprobada() {
        return fichaaprobada;
    }

    public void setFichaaprobada(String fichaaprobada) {
        this.fichaaprobada = fichaaprobada;
    }

    public String getFechaaprobacion() {
        return fechaaprobacion;
    }

    public void setFechaaprobacion(String fechaaprobacion) {
        this.fechaaprobacion = fechaaprobacion;
    }

    public String getCodcalle() {
        return codcalle;
    }

    public void setCodcalle(String codcalle) {
        this.codcalle = codcalle;
    }

    public String getCodurbaso() {
        return codurbaso;
    }

    public void setCodurbaso(String codurbaso) {
        this.codurbaso = codurbaso;
    }

    public String getActividad() {
        return actividad;
    }

    public void setActividad(String actividad) {
        this.actividad = actividad;
    }

    public String getCatetar() {
        return catetar;
    }

    public void setCatetar(String catetar) {
        this.catetar = catetar;
    }

    public String getDesactividad() {
        return desactividad;
    }

    public void setDesactividad(String desactividad) {
        this.desactividad = desactividad;
    }

    public String getDescatetar() {
        return descatetar;
    }

    public void setDescatetar(String descatetar) {
        this.descatetar = descatetar;
    }

    public String getUnidades_uso() {
        return unidades_uso;
    }

    public void setUnidades_uso(String unidades_uso) {
        this.unidades_uso = unidades_uso;
    }

    public String getFotodetalle4() {
        return fotodetalle4;
    }

    public void setFotodetalle4(String fotodetalle4) {
        this.fotodetalle4 = fotodetalle4;
    }

    public String getFotodetalle5() {
        return fotodetalle5;
    }

    public void setFotodetalle5(String fotodetalle5) {
        this.fotodetalle5 = fotodetalle5;
    }


}


