package org.catastro.sistemafichacatastral;

import fr.opensagres.xdocreport.template.IContext;
import fr.opensagres.xdocreport.template.TemplateEngineKind;
import fr.opensagres.xdocreport.document.IXDocReport;
import fr.opensagres.xdocreport.document.registry.XDocReportRegistry;
import fr.opensagres.xdocreport.converter.Options;
import fr.opensagres.xdocreport.converter.ConverterTypeTo;

import java.io.*;
import java.nio.file.Files;

public class ReporteFicha {

    public static void main(String[] args) {
        System.out.println("Working directory: " + System.getProperty("user.dir"));

        String resourcePath = "plantilla3.docx";

        // Lee desde recursos del classpath
        try (InputStream resourceStream = ReporteFicha.class.getClassLoader().getResourceAsStream(resourcePath)) {

            if (resourceStream == null) {
                throw new FileNotFoundException("Archivo NO encontrado: " + resourcePath);
            }

            // Copia InputStream a un archivo temporal para garantizar que XDocReport reconozca el tipo
            File tempFile = File.createTempFile("temp_plantilla", ".docx");
            Files.copy(resourceStream, tempFile.toPath(), java.nio.file.StandardCopyOption.REPLACE_EXISTING);

            try (InputStream fileInput = new FileInputStream(tempFile);
                 OutputStream outDocx = new FileOutputStream("salida.docx")) {

                IXDocReport report = XDocReportRegistry.getRegistry()
                        .loadReport(fileInput, tempFile.getName(), TemplateEngineKind.Velocity);

                IContext context = report.createContext();
                context.put("nombre", "Juan Pérez");
                context.put("codigo", "XYZ123");

                report.process(context, outDocx);
                System.out.println("✅ DOCX generado correctamente: salida.docx");

                // Generar PDF (opcional)
                try (OutputStream outPdf = new FileOutputStream("salida.pdf")) {
                    Options options = Options.getTo(ConverterTypeTo.PDF);
                    report.convert(context, options, outPdf);
                    System.out.println("✅ PDF generado correctamente: salida.pdf");
                }

            } finally {
                // Limpia el archivo temporal
                if (tempFile.exists()) {
                    tempFile.delete();
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
