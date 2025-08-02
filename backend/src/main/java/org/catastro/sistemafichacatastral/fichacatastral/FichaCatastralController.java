package org.catastro.sistemafichacatastral.fichacatastral;


import fr.opensagres.xdocreport.document.images.ByteArrayImageProvider;
import fr.opensagres.xdocreport.template.formatter.FieldsMetadata;
import fr.opensagres.xdocreport.template.formatter.NullImageBehaviour;
import org.catastro.sistemafichacatastral.DocxProjectWithFreemarkerAndImage;
import org.catastro.sistemafichacatastral.FichaCatastroUnidadUso;
import org.catastro.sistemafichacatastral.GrupoTrabajo.GrupoTrabajoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.catastro.sistemafichacatastral.FichasCatastrales.FichasService;
import org.catastro.sistemafichacatastral.dto.DetalleFichaClienteDto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.catastro.sistemafichacatastral.Project;

import org.springframework.web.bind.annotation.RestController;
import fr.opensagres.xdocreport.document.images.ClassPathImageProvider;
import fr.opensagres.xdocreport.document.images.IImageProvider;
import fr.opensagres.xdocreport.document.registry.XDocReportRegistry;
import fr.opensagres.xdocreport.converter.Options;
import fr.opensagres.xdocreport.converter.ConverterTypeTo;
import fr.opensagres.xdocreport.document.IXDocReport;
import fr.opensagres.xdocreport.document.registry.XDocReportRegistry;
import fr.opensagres.xdocreport.template.IContext;
import fr.opensagres.xdocreport.template.TemplateEngineKind;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;


import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("ficha-catastral")
public class FichaCatastralController {


    @Autowired
    //private FichasService fichasService;

    private final FichaCatastralService fichaCatastralService;
    private final FichasService fichasService;

    public FichaCatastralController(FichaCatastralService fichaCatastralService,  FichasService fichasService) {
        this.fichaCatastralService = fichaCatastralService;
        this.fichasService = fichasService;
    }

    @GetMapping("/docx3")
    public ResponseEntity<byte[]> generarWord3(
            @RequestParam(defaultValue = "10") int codcliente
    ) {
        try {
            // 1. Carga la plantilla desde el classpath
           // String plantillaPath = "DocxProjectWithVelocityAndImage.docx";

            FichaCatastro ofichacastrao = this.fichasService.obtenerDataFichaCatastroJSON(codcliente);

            String plantillaPath = "plantillaficha-copia.docx";
            InputStream in = getClass().getClassLoader().getResourceAsStream(plantillaPath);
            if (in == null) {
                throw new RuntimeException("No se encontró la plantilla en el classpath.");
            }

            IXDocReport report = XDocReportRegistry.getRegistry().loadReport(in, TemplateEngineKind.Velocity);

            // 2. Metadatos de imágenes
            FieldsMetadata metadata = report.createFieldsMetadata();
            metadata.addFieldAsImage("ImgConexionDesague");
            metadata.addFieldAsImage("ImgConexionAgua");
            metadata.addFieldAsImage("ImgCroquis");
            metadata.addFieldAsImage("ImgFachada");


            // 3. Modelo y contexto
            IContext context = report.createContext();
            Project project = new Project("XDocReport"); // Aquí puedes poner tu propio modelo
           // context.put("project", project);

            // Convertir el objeto a un Map con Jackson
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> propiedades = mapper.convertValue(ofichacastrao, Map.class);

// Recorrer el Map y agregar todo al context
            for (Map.Entry<String, Object> entry : propiedades.entrySet()) {
                context.put(entry.getKey(), entry.getValue() != null ? entry.getValue() : "");
            }


           /* context.put("region", "CUSCO");
            context.put("sucursal", "CUSCO");
            context.put("sector", "CUSPITAPARA");
            context.put("mzna", "L");
            context.put("lote", "12");
            context.put("sublote", "-");
            context.put("suministro", "1234566");
            context.put("mz_muni", "L");
            context.put("lt_muni", "-");
            context.put("urb_asoc", "-");
            context.put("tiposervicio", "AGUA");
            context.put("tipoasentamiento", "URBANO");
            context.put("piscina", "NO");
            context.put("reservorio", "NO");*/





            boolean useImageSize = true;


            IImageProvider ImgConexionDesague = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png", useImageSize);
            ImgConexionDesague.setSize(80f, 80f);
            context.put("ImgConexionDesague", ImgConexionDesague);


            IImageProvider ImgConexionAgua = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png");
            ImgConexionAgua.setSize(80f, 80f);
            context.put("ImgConexionAgua", ImgConexionAgua);


            IImageProvider ImgCroquis = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png");
            ImgCroquis.setSize(120f, 80f);
            context.put("ImgCroquis", ImgCroquis);

            IImageProvider ImgFachada = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png");
            ImgFachada.setSize(80f, 80f);
            context.put("ImgFachada", ImgFachada);

           List<FichaCatastroUnidadUso> actividades = new ArrayList<>();
          /*  actividades.add(new FichaCatastroUnidadUso("Comercial", "Venta de ropa", 3, "La Moda S.A.", "Cerca al parque"));
            actividades.add(new FichaCatastroUnidadUso("Gastronómica", "Restaurante", 1, "Delicias EIRL", "Frente al colegio"));
            actividades.add(new FichaCatastroUnidadUso("Educativa", "Academia de inglés", 2, "English Fast", "Al costado del cine"));
            actividades.add(new FichaCatastroUnidadUso("Salud", "Clínica dental", 1, "Sonrisas S.A.C.", "Avenida Central 123"));
            actividades.add(new FichaCatastroUnidadUso("Comercial", "Venta de electrónicos", 4, "ElectroMundo", "Cerca del mercado central"));
            actividades.add(new FichaCatastroUnidadUso("Recreativa", "Gimnasio", 2, "Power Gym", "Frente a la plaza principal"));
            actividades.add(new FichaCatastroUnidadUso("Gastronómica", "Cafetería", 1, "Café & Té", "Jirón Lima 456"));
            actividades.add(new FichaCatastroUnidadUso("Comercial", "Librería", 2, "Letras Libres", "A media cuadra de la municipalidad"));
            actividades.add(new FichaCatastroUnidadUso("Educativa", "Centro de cómputo", 3, "CompuNet", "Pasaje Los Pinos 101"));
            actividades.add(new FichaCatastroUnidadUso("Salud", "Botica", 1, "Botica Salud", "Cerca al hospital"));
            actividades.add(new FichaCatastroUnidadUso("Servicios", "Peluquería", 1, "Estilo y Corte", "A espaldas del estadio"));*/


            context.put("actividades", ofichacastrao.getList_fichacatastro_epsuniduso());

            //Parametros de prueba





            // 4. Exportar a un array de bytes (en memoria)
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            report.process(context, out);

            // 5. Armar respuesta HTTP para descarga
            byte[] documento = out.toByteArray();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"ficha_catastral.docx\"");

            return new ResponseEntity<>(documento, headers, HttpStatus.OK);

        } catch (Exception e) {
            System.err.println("❌ Error al generar el documento:");
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }









}
