package org.catastro.sistemafichacatastral;

import org.apache.poi.util.Units;
import org.apache.poi.xwpf.usermodel.*;
import java.io.*;

public class ReporteFicha {

    public static void main(String[] args) throws Exception {
        XWPFDocument doc = new XWPFDocument();
        XWPFParagraph p = doc.createParagraph();
        XWPFRun r = p.createRun();
        r.setText("Aquí va una imagen:");

        // Inserta la imagen (puede ser .png, .jpg, etc.)
        InputStream is = new FileInputStream("imagenes/imagen.png");
        r.addPicture(is, Document.PICTURE_TYPE_PNG, "imagen.png", Units.toEMU(200), Units.toEMU(200));
        is.close();

        // Guarda el archivo Word
        FileOutputStream out = new FileOutputStream("salida.docx");
        doc.write(out);
        out.close();
        doc.close();
    }
}
