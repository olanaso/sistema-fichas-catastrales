package org.catastro.sistemafichacatastral.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InspectorDTO {
        private String codemp;
        private String codsede;
        private String codinspector;
        private String nombres;
        private short asignadoareclamos;
        private short estareg;
        private String creador;
        private Timestamp fechareg;
        private short asignadoalectura;
        private short asignadoacalibradormed;
        private String dni;
        private String codoficina;
        private String clave;
        private String login;
        private short reaperturamovil;
        private short asignadoacortes;
        private short supervisor;
        private short asignadoconsultas;
        private Short proyectocatastro; // puede ser NULL
        private short asignadocatastro;
        private short asignadoinspecciones;
        private short asignadoareapertura;
        private short asignadoanotificaciones;
        private short asignadoparquemedidores;
        private short asignadofactibilidad;
        private short asignadoincidenciacampo;
        private short asignadoordendepago;
        private short asignadoentregarecibo;
        private short asignadoalcencegeneral;
        private short asignadocatastroreal;
        private String codbrigada;
}
