package org.catastro.sistemafichacatastral;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import fr.opensagres.xdocreport.core.XDocReportException;
import fr.opensagres.xdocreport.document.IXDocReport;
import fr.opensagres.xdocreport.document.images.ClassPathImageProvider;
import fr.opensagres.xdocreport.document.images.IImageProvider;
import fr.opensagres.xdocreport.document.registry.XDocReportRegistry;
import org.catastro.sistemafichacatastral.Project;
import fr.opensagres.xdocreport.template.IContext;
import fr.opensagres.xdocreport.template.TemplateEngineKind;
import fr.opensagres.xdocreport.template.formatter.FieldsMetadata;
import fr.opensagres.xdocreport.template.formatter.NullImageBehaviour;



public class DocxProjectWithFreemarkerAndImage {



    public static void main(String[] args) {
        try
        {
            // 1) Load Docx file by filling Velocity template engine and cache
            // it to the registry
            String plantillaPath = "DocxProjectWithVelocityAndImage.docx";
            InputStream in = DocxProjectWithFreemarkerAndImage.class
                    .getClassLoader()
                    .getResourceAsStream(plantillaPath);
            if (in == null) {
                throw new RuntimeException("No se encontró la plantilla en el classpath.");
            }
            //  InputStream in = DocxProjectWithFreemarkerAndImage.class.getResourceAsStream("/org/catastro/sistemafichacatastral/DocxProjectWithVelocityAndImage.docx");

            IXDocReport report = XDocReportRegistry.getRegistry().loadReport( in, TemplateEngineKind.Velocity );

            // 2) Create fields metadata to manage image
            FieldsMetadata metadata = report.createFieldsMetadata();
            metadata.addFieldAsImage( "logo" );
            metadata.addFieldAsImage( "originalSizeLogo" );
            metadata.addFieldAsImage( "forcedSizeLogo" );
            metadata.addFieldAsImage( "ratioSizeLogo" );
            metadata.addFieldAsImage( "imageNotExistsAndRemoveImageTemplate", NullImageBehaviour.RemoveImageTemplate );
            metadata.addFieldAsImage( "imageNotExistsAndKeepImageTemplate", NullImageBehaviour.KeepImageTemplate );





            // 3) Create context Java model
            IContext context = report.createContext();
            Project project = new Project( "XDocReport" );
            context.put( "project", project );
            IImageProvider logo = new ClassPathImageProvider( DocxProjectWithFreemarkerAndImage.class.getClassLoader(), "logo.png" );
            context.put( "logo", logo );

            boolean useImageSize = true;
            IImageProvider originalSizeLogo =
                    new ClassPathImageProvider( DocxProjectWithFreemarkerAndImage.class.getClassLoader(), "logo.png", useImageSize );
            context.put( "originalSizeLogo", originalSizeLogo );

            // Image with width/height forced
            IImageProvider forcedSizeLogo =
                    new ClassPathImageProvider( DocxProjectWithFreemarkerAndImage.class.getClassLoader(), "logo.png" );
            forcedSizeLogo.setSize( 400f, 100f );
            context.put( "forcedSizeLogo", forcedSizeLogo );

            // Image with width forced and height computed with ratio
            IImageProvider ratioSizeLogo =
                    new ClassPathImageProvider( DocxProjectWithFreemarkerAndImage.class.getClassLoader(), "logo.png" );
            ratioSizeLogo.setUseImageSize( true );
            ratioSizeLogo.setWidth( 400f );
            ratioSizeLogo.setResize( true );
            context.put( "ratioSizeLogo", ratioSizeLogo );

            // 4) Generate report by merging Java model with the Docx
            OutputStream out = new FileOutputStream( new File( "DocxProjectWithVelocityAndImage_Out.docx" ) );

            report.process( context, out );
        }
        catch ( IOException e )
        {
            e.printStackTrace();
        }
        catch ( XDocReportException e )
        {
            e.printStackTrace();
        }
    }
}
