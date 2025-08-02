package org.catastro.sistemafichacatastral.fichacatastral;


import com.documents4j.api.DocumentType;
import com.documents4j.api.IConverter;
import com.documents4j.job.LocalConverter;
import fr.opensagres.poi.xwpf.converter.pdf.PdfConverter;
import fr.opensagres.poi.xwpf.converter.pdf.PdfOptions;
import fr.opensagres.xdocreport.document.images.ByteArrayImageProvider;
import fr.opensagres.xdocreport.template.formatter.FieldsMetadata;
import fr.opensagres.xdocreport.template.formatter.NullImageBehaviour;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.catastro.sistemafichacatastral.DocxProjectWithFreemarkerAndImage;
import org.catastro.sistemafichacatastral.FichaCatastroUnidadUso;
import org.catastro.sistemafichacatastral.GrupoTrabajo.GrupoTrabajoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.catastro.sistemafichacatastral.FichasCatastrales.FichasService;
import org.catastro.sistemafichacatastral.FTP.FtpService;

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
import java.io.*;

import java.nio.file.Files;
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

    @GetMapping("/docx")
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


            for (Map.Entry<String, Object> entry : propiedades.entrySet()) {
                context.put(entry.getKey(), entry.getValue() != null ? entry.getValue() : "");
            }





            boolean useImageSize = true;
             FtpService ftpService = new FtpService();

            byte[] ImgConexionDesagueBytes =ftpService.obtenerImagenComoBytes(ofichacastrao.getFotocajadesague());
            IImageProvider ImgConexionDesague = new ByteArrayImageProvider(ImgConexionDesagueBytes);//ClassPathImageProvider(getClass().getClassLoader(), "logo.png", useImageSize);
            if(ImgConexionDesague == null){
                ImgConexionDesague = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png");
            }
            ImgConexionDesague.setSize(80f, 80f);
            context.put("ImgConexionDesague", ImgConexionDesague);

            byte[] ImgConexionAguaBytes =ftpService.obtenerImagenComoBytes(ofichacastrao.getFotocajaagua());
            IImageProvider ImgConexionAgua = new ByteArrayImageProvider(ImgConexionAguaBytes);
            if(ImgConexionAgua == null){
                ImgConexionAgua = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png");
            }
            ImgConexionAgua.setSize(80f, 80f);
            context.put("ImgConexionAgua", ImgConexionAgua);


            byte[] ImgCroquisBytes =ftpService.obtenerImagenComoBytes(ofichacastrao.getFotofachada());
            IImageProvider ImgCroquis = new ByteArrayImageProvider(ImgCroquisBytes);
            if(ImgCroquis == null){
                 ImgCroquis = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png");
            }

            ImgCroquis.setSize(120f, 80f);
            context.put("ImgCroquis", ImgCroquis);

            byte[] ImgFachadaBytes =ftpService.obtenerImagenComoBytes(ofichacastrao.getFotofachada());
            IImageProvider ImgFachada = new ByteArrayImageProvider(ImgFachadaBytes);

            if(ImgFachada == null){
                ImgFachada = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png");
            }
           // IImageProvider ImgFachada = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png");
            ImgFachada.setSize(80f, 80f);
            context.put("ImgFachada", ImgFachada);

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



    @GetMapping("/pdf")
    public ResponseEntity<byte[]> generarPDF(@RequestParam(defaultValue = "10") int codcliente) {
        File tempDocx = null;
        File tempPdf = null;

        try {
            // 1. Generar DOCX primero usando tu código original con XDocReport
            String plantillaPath = "plantillaficha-copia.docx";
            InputStream in = getClass().getClassLoader().getResourceAsStream(plantillaPath);
            if (in == null) {
                throw new RuntimeException("No se encontró la plantilla.");
            }

            IXDocReport report = XDocReportRegistry.getRegistry().loadReport(in, TemplateEngineKind.Velocity);

            FieldsMetadata metadata = report.createFieldsMetadata();
            metadata.addFieldAsImage("ImgConexionDesague");
            metadata.addFieldAsImage("ImgConexionAgua");
            metadata.addFieldAsImage("ImgCroquis");
            metadata.addFieldAsImage("ImgFachada");

            IContext context = report.createContext();
            FichaCatastro ofichacastrao = fichasService.obtenerDataFichaCatastroJSON(codcliente);
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> propiedades = mapper.convertValue(ofichacastrao, Map.class);
            propiedades.forEach((k, v) -> context.put(k, v != null ? v : ""));

            // Manejo de imágenes simplificado (ajústalo si lo necesitas)
            FtpService ftpService = new FtpService();
            context.put("ImgConexionDesague", new ByteArrayImageProvider(ftpService.obtenerImagenComoBytes(ofichacastrao.getFotocajadesague())));
            context.put("ImgConexionAgua", new ByteArrayImageProvider(ftpService.obtenerImagenComoBytes(ofichacastrao.getFotocajaagua())));
            context.put("ImgCroquis", new ByteArrayImageProvider(ftpService.obtenerImagenComoBytes(ofichacastrao.getFotofachada())));
            context.put("ImgFachada", new ByteArrayImageProvider(ftpService.obtenerImagenComoBytes(ofichacastrao.getFotofachada())));
            context.put("actividades", ofichacastrao.getList_fichacatastro_epsuniduso());

            // Archivo temporal DOCX
            tempDocx = File.createTempFile("tempFicha", ".docx");
            try (FileOutputStream fos = new FileOutputStream(tempDocx)) {
                report.process(context, fos);
            }

            // 2. Convertir DOCX → PDF con documents4j
            tempPdf = File.createTempFile("tempFicha", ".pdf");
            IConverter converter = LocalConverter.builder().build();

            try (FileInputStream docxInputStream = new FileInputStream(tempDocx);
                 FileOutputStream pdfOutputStream = new FileOutputStream(tempPdf)) {
                boolean conversion = converter.convert(docxInputStream)
                        .as(DocumentType.DOCX)
                        .to(pdfOutputStream)
                        .as(DocumentType.PDF)
                        .execute();
                if (!conversion) {
                    throw new RuntimeException("Fallo en conversión DOCX a PDF");
                }
            } finally {
                converter.shutDown();
            }

            // 3. Devolver PDF generado
            byte[] pdfBytes = Files.readAllBytes(tempPdf.toPath());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"ficha_catastral.pdf\"");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        } finally {
            // Limpieza de temporales
            if (tempDocx != null) tempDocx.delete();
            if (tempPdf != null) tempPdf.delete();
        }
    }


    private IImageProvider obtenerImagen(byte[] imagenBytes) {
        if (imagenBytes == null || imagenBytes.length == 0) {
            return new ClassPathImageProvider(getClass().getClassLoader(), "logo.png");
        }
        IImageProvider imagen = new ByteArrayImageProvider(imagenBytes);
        imagen.setSize(80f, 80f);
        return imagen;
    }





}
