package org.catastro.sistemafichacatastral.fichacatastral;


import fr.opensagres.xdocreport.document.images.ByteArrayImageProvider;
import fr.opensagres.xdocreport.template.formatter.FieldsMetadata;
import fr.opensagres.xdocreport.template.formatter.NullImageBehaviour;
import org.catastro.sistemafichacatastral.DocxProjectWithFreemarkerAndImage;
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

import java.util.Map;


@RestController
@RequestMapping("ficha-catastral")
public class FichaCatastralController {

    private final FichaCatastralService fichaCatastralService;
    private final FichasService fichasService;

    public FichaCatastralController(FichaCatastralService fichaCatastralService,  FichasService fichasService) {
        this.fichaCatastralService = fichaCatastralService;
        this.fichasService = fichasService;
    }

    @GetMapping("/docx3")
    public ResponseEntity<byte[]> generarWord3() {
        try {
            // 1. Carga la plantilla desde el classpath
           // String plantillaPath = "DocxProjectWithVelocityAndImage.docx";
            String plantillaPath = "plantillaficha.docx";
            InputStream in = getClass().getClassLoader().getResourceAsStream(plantillaPath);
            if (in == null) {
                throw new RuntimeException("No se encontró la plantilla en el classpath.");
            }

            IXDocReport report = XDocReportRegistry.getRegistry().loadReport(in, TemplateEngineKind.Velocity);

            // 2. Metadatos de imágenes
            FieldsMetadata metadata = report.createFieldsMetadata();
            metadata.addFieldAsImage("logo");
            metadata.addFieldAsImage("originalSizeLogo");
            metadata.addFieldAsImage("forcedSizeLogo");
            metadata.addFieldAsImage("pruebaLogo");
            metadata.addFieldAsImage("ratioSizeLogo");
            metadata.addFieldAsImage("imageNotExistsAndRemoveImageTemplate", NullImageBehaviour.RemoveImageTemplate);
            metadata.addFieldAsImage("imageNotExistsAndKeepImageTemplate", NullImageBehaviour.KeepImageTemplate);

            // 3. Modelo y contexto
            IContext context = report.createContext();
            Project project = new Project("XDocReport"); // Aquí puedes poner tu propio modelo
            context.put("project", project);
            IImageProvider logo = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png");
            context.put("logo", logo);

            boolean useImageSize = true;
            IImageProvider originalSizeLogo = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png", useImageSize);
            context.put("originalSizeLogo", originalSizeLogo);

            IImageProvider forcedSizeLogo = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png");
            forcedSizeLogo.setSize(80f, 80f);
            context.put("forcedSizeLogo", forcedSizeLogo);

            IImageProvider pforcedSizeLogo = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png");
            forcedSizeLogo.setSize(80f, 80f);
            context.put("pruebaLogo", pforcedSizeLogo);

            IImageProvider ratioSizeLogo = new ClassPathImageProvider(getClass().getClassLoader(), "logo.png");
            ratioSizeLogo.setUseImageSize(true);
            ratioSizeLogo.setWidth(400f);
            ratioSizeLogo.setResize(true);
            context.put("ratioSizeLogo", ratioSizeLogo);

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
