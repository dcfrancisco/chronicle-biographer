package com.chronicle.ingestion.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

@Service
public class LocalTextExtractionService {

    public String extract(String fileName, byte[] content) {
        String lowerName = fileName.toLowerCase(Locale.ROOT);

        try {
            if (lowerName.endsWith(".txt") || lowerName.endsWith(".md")) {
                return new String(content, StandardCharsets.UTF_8);
            }
            if (lowerName.endsWith(".pdf")) {
                return extractPdf(content);
            }
            if (lowerName.endsWith(".docx")) {
                return extractDocx(content);
            }
            return new String(content, StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new IllegalArgumentException("Unable to extract text from " + fileName, e);
        }
    }

    private String extractPdf(byte[] content) throws IOException {
        try (PDDocument document = PDDocument.load(content)) {
            PDFTextStripper stripper = new PDFTextStripper();
            StringBuilder out = new StringBuilder();
            int pages = document.getNumberOfPages();
            for (int page = 1; page <= pages; page++) {
                stripper.setStartPage(page);
                stripper.setEndPage(page);
                out.append(stripper.getText(document).trim());
                if (page < pages) {
                    out.append('\f');
                }
                out.append("\n\n");
            }
            return out.toString().trim();
        }
    }

    private String extractDocx(byte[] content) throws IOException {
        try (XWPFDocument document = new XWPFDocument(new ByteArrayInputStream(content))) {
            StringBuilder out = new StringBuilder();
            for (XWPFParagraph paragraph : document.getParagraphs()) {
                String text = paragraph.getText();
                if (!text.isBlank()) {
                    out.append(text.trim()).append("\n\n");
                }
            }
            return out.toString().trim();
        }
    }
}
