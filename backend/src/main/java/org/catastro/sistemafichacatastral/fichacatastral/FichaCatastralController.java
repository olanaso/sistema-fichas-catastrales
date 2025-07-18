package org.catastro.sistemafichacatastral.fichacatastral;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import fr.opensagres.xdocreport.converter.Options;
import fr.opensagres.xdocreport.converter.ConverterTypeTo;
import fr.opensagres.xdocreport.document.IXDocReport;
import fr.opensagres.xdocreport.document.registry.XDocReportRegistry;
import fr.opensagres.xdocreport.template.IContext;
import fr.opensagres.xdocreport.template.TemplateEngineKind;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;


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



    @GetMapping("/pdf")
    public ResponseEntity<byte[]> generarPdf() {

        try (InputStream plantillaStream = getClass().getClassLoader().getResourceAsStream("plantillaficha.docx")) {

            if (plantillaStream == null) {
                return ResponseEntity.notFound().build();
            }

            IXDocReport report;
            String plantillaId = "plantillaficha.docx";

            // Verifica si la plantilla ya está registrada

            if (XDocReportRegistry.getRegistry().existsReport(plantillaId)) {
                XDocReportRegistry.getRegistry().unregisterReport(plantillaId);
            }
            report = XDocReportRegistry.getRegistry()
                    .loadReport(plantillaStream, plantillaId, TemplateEngineKind.Velocity);

           /* if (XDocReportRegistry.getRegistry().existsReport(plantillaId)) {
                report = XDocReportRegistry.getRegistry().getReport(plantillaId);
            } else {
                report = XDocReportRegistry.getRegistry()
                        .loadReport(plantillaStream, plantillaId, TemplateEngineKind.Velocity);
            }*/

            IContext context = report.createContext();
            context.put("region", "Juan Pérez");
            context.put("codigo", "XYZ123");
            context.put("direccion", "ayacucho lima");
            context.put("edad", "25");

            ByteArrayOutputStream pdfOut = new ByteArrayOutputStream();
            Options options = Options.getTo(ConverterTypeTo.PDF);
            report.convert(context, options, pdfOut);

            byte[] pdfBytes = pdfOut.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("inline", "reporte.pdf");

            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .body(pdfBytes);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/docx")
    public ResponseEntity<byte[]> generarWord() {

        try (InputStream plantillaStream = getClass().getClassLoader().getResourceAsStream("plantillaficha.docx")) {

            if (plantillaStream == null) {
                return ResponseEntity.notFound().build();
            }

            IXDocReport report;
            String plantillaId = "plantillaficha.docx";

            if (XDocReportRegistry.getRegistry().existsReport(plantillaId)) {
                report = XDocReportRegistry.getRegistry().getReport(plantillaId);
            } else {
                report = XDocReportRegistry.getRegistry()
                        .loadReport(plantillaStream, plantillaId, TemplateEngineKind.Velocity);
            }

            IContext context = report.createContext();
            context.put("region", "Juan Pérez");
            context.put("codigo", "XYZ123");
            context.put("direccion", "ayacucho lima");
            context.put("edad", "25");

            ByteArrayOutputStream docxOut = new ByteArrayOutputStream();
            report.process(context, docxOut);

            byte[] docxBytes = docxOut.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.wordprocessingml.document"));
            headers.setContentDispositionFormData("attachment", "reporte.docx");

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
