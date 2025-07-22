package org.catastro.sistemafichacatastral.fichacatastral;

import fr.opensagres.xdocreport.document.images.ByteArrayImageProvider;
import fr.opensagres.xdocreport.template.formatter.FieldsMetadata;
import fr.opensagres.xdocreport.template.formatter.NullImageBehaviour;
import org.catastro.sistemafichacatastral.DocxProjectWithFreemarkerAndImage;
import org.springframework.http.HttpStatus;
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

    public FichaCatastralController(FichaCatastralService fichaCatastralService) {
        this.fichaCatastralService = fichaCatastralService;
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




    @GetMapping("/docx2")
    public ResponseEntity<byte[]> generarWord2() {
        String plantillaId = "plantillaficha2.docx";
        String nombreArchivo = "reporte56.docx";
        String nombreImagen = "imagenes/foto.jpg"; // La ruta debe estar en src/main/resources/imagenes/foto.jpg

        try (InputStream plantillaStream = getClass().getClassLoader().getResourceAsStream(plantillaId)) {

            if (plantillaStream == null) {
                System.err.println("No se encontró la plantilla: " + plantillaId);
                return ResponseEntity.notFound().build();
            }

            // Cargar plantilla y motor de plantilla Velocity
            IXDocReport report = XDocReportRegistry.getRegistry()
                    .loadReport(plantillaStream, plantillaId, TemplateEngineKind.Velocity);

            // Declarar campo de imagen correctamente
            FieldsMetadata metadata = report.createFieldsMetadata();
            metadata.addFieldAsImage("imagen");

            IContext context = report.createContext();
            context.put("region", "Juan Pérez");
            context.put("codigo", "XYZ123");
            context.put("direccion", "Ayacucho, Lima");
            context.put("edad", "25");

            // Cargar y procesar imagen
            try (InputStream imageStream = getClass().getClassLoader().getResourceAsStream(nombreImagen)) {
                if (imageStream != null) {
                    BufferedImage originalImage = ImageIO.read(imageStream);

                    // Redimensionar a 120x120 píxeles
                    int widthPx = 120, heightPx = 120;
                    Image scaledImage = originalImage.getScaledInstance(widthPx, heightPx, Image.SCALE_SMOOTH);
                    BufferedImage resizedImage = new BufferedImage(widthPx, heightPx, BufferedImage.TYPE_INT_RGB);

                    Graphics2D g2d = resizedImage.createGraphics();
                    g2d.drawImage(scaledImage, 0, 0, null);
                    g2d.dispose();

                    // Convertir a bytes
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    ImageIO.write(resizedImage, "jpg", baos);
                    byte[] imageBytes = baos.toByteArray();

                    // Poner imagen en el contexto
                    context.put("imagen", new ByteArrayImageProvider(imageBytes));
                    baos.close();
                } else {
                    System.err.println("No se encontró la imagen: " + nombreImagen);
                    context.put("imagen", null);
                }
            }

            // Generar el documento
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            report.process(context, out);

            // Preparar respuesta HTTP
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"));
            headers.setContentDispositionFormData("attachment", nombreArchivo);

            return ResponseEntity.ok().headers(headers).body(out.toByteArray());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }


    @GetMapping("/docx")
    public ResponseEntity<byte[]> generarWord() {
        String plantillaId = "plantillaficha2.docx";
        String nombreArchivo = "reporte56.docx";
        String nombreImagen = "imagenes/foto.jpg"; // La ruta debe ser src/main/resources/imagenes/foto.jpg

        try (InputStream plantillaStream = getClass().getClassLoader().getResourceAsStream(plantillaId)) {

            if (plantillaStream == null) {
                System.err.println("No se encontró la plantilla: " + plantillaId);
                return ResponseEntity.notFound().build();
            }

            IXDocReport report;
            if (XDocReportRegistry.getRegistry().existsReport(plantillaId)) {
                report = XDocReportRegistry.getRegistry().getReport(plantillaId);
                report.createFieldsMetadata().addFieldAsImage("imagen");
            } else {
                report = XDocReportRegistry.getRegistry()
                        .loadReport(plantillaStream, plantillaId, TemplateEngineKind.Velocity);

                // Declara que el campo "imagen" es una imagen
                FieldsMetadata metadata = report.createFieldsMetadata();
                metadata.addFieldAsImage("imagen");
            }

            IContext context = report.createContext();
            context.put("region", "Juan Pérez");
            context.put("codigo", "XYZ123");
            context.put("direccion", "ayacucho lima");
            context.put("edad", "25");

            // --- Cargar imagen correctamente ---
            try (InputStream imageStream = getClass().getClassLoader().getResourceAsStream(nombreImagen)) {
                if (imageStream != null) {
                    byte[] imageBytes = imageStream.readAllBytes();
                    ByteArrayImageProvider imageProvider = new ByteArrayImageProvider(imageBytes);
                    context.put("imagen", imageProvider);
                    System.out.println("Imagen cargada correctamente: " + nombreImagen);
                } else {
                    // Si no hay imagen, puedes poner null o un mensaje/log.
                    context.put("imagen", null); // O no poner nada, como prefieras.
                    System.err.println("No se encontró la imagen: " + nombreImagen);
                }
            }

            // --- Generar el Word ---
            ByteArrayOutputStream docxOut = new ByteArrayOutputStream();
            report.process(context, docxOut);

            byte[] docxBytes = docxOut.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"));
            headers.setContentDispositionFormData("attachment", nombreArchivo);

            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .body(docxBytes);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }




}
