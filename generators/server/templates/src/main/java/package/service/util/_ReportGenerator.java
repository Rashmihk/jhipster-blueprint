package <%=packageName%>.service.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fhlbny.commons.Constants;
import com.fhlbny.commons.CustomException;
import com.fhlbny.commons.beans.DigitalSignatureBean;
import com.fhlbny.commons.beans.ReportFileType;
import com.fhlbny.commons.utils.CSVGenerator;
import com.fhlbny.commons.utils.PDFGenerator;
import com.fhlbny.commons.utils.XLSGenerator;

@Component
public class ReportGenerator {

    private final CSVGenerator csvGenerator;
    private final PDFGenerator pdfGenerator;
    private final XLSGenerator xlsGenerator;

    @Autowired
    public ReportGenerator(
            CSVGenerator csvGenerator,
            PDFGenerator pdfGenerator,
            XLSGenerator xlsGenerator) {
        this.csvGenerator = csvGenerator;
        this.pdfGenerator = pdfGenerator;
        this.xlsGenerator = xlsGenerator;
    }

    /***
     * This method use to generate listing report, for PDF report it required
     * generic XSL
     *
     * @param reportData
     *            list of records to be display in report file
     * @param exportType
     *            Export type
     * @param reportHeader
     *            report data headers
     * @param workBookName
     *            Workbook name
     * @param fileName
     *            File name
     * @param reportTitle
     *            Report Title for PDF report
     * @param excludeHeaders
     *            key name which needs to exclude
     * @param xslFile
     *            XSL File for PDF report generation if null then default XSL
     *            file will use
     * @return report
     * @throws URISyntaxException
     */
    public ReportFileType generateListingReport(
            List<?> reportData,
            String exportType,
            Map<String, String> reportHeader,
            String workBookName,
            String fileName,
            String reportTitle,
            List<String> excludeHeaders,
            File xslFile) {

        HttpHeaders httpHeaders = new HttpHeaders();
        File outputFile = null;
        ReportFileType report;
        try {
            if (Constants.PDF.equals(exportType)) {
                File fhlbLogo = new ClassPathResource("fhlbny_logo.jpg").getFile();
                if (xslFile == null) {
                    xslFile = new ClassPathResource("report.xsl").getFile();
                }
                DigitalSignatureBean signatureBean = new DigitalSignatureBean();
                signatureBean.setFileName(fileName);
                signatureBean.setReportTitle(reportTitle);
                outputFile = pdfGenerator.createPDF(
                        reportData,
                        xslFile,
                        fhlbLogo.getAbsolutePath(),
                        null,
                        signatureBean,
                        reportHeader.values().stream().collect(Collectors.toList()),
                        excludeHeaders);
                httpHeaders.setContentType(MediaType.APPLICATION_PDF);

            } else if (Constants.XLS.equals(exportType)) {

                ObjectMapper mapper = new ObjectMapper();
                ByteArrayOutputStream outStream = new ByteArrayOutputStream();
                mapper.writeValue(outStream, reportData);

                outputFile = xlsGenerator.createExcel(
                        new JSONArray(new String(outStream.toByteArray())),
                        reportHeader,
                        fileName,
                        workBookName);
                httpHeaders.setContentType(MediaType.parseMediaType(Constants.MEDIA_TYPE_XLS));

            } else if (Constants.CSV.equals(exportType)) {

                ObjectMapper mapper = new ObjectMapper();
                ByteArrayOutputStream outStream = new ByteArrayOutputStream();
                mapper.writeValue(outStream, reportData);
                outputFile = csvGenerator
                        .createCSV(
                                new JSONArray(new String(outStream.toByteArray())),
                                reportHeader,
                                fileName);
                httpHeaders.setContentType(MediaType.parseMediaType(Constants.MEDIA_TYPE_CSV));

            }
            if (outputFile == null) {
                throw new CustomException("Error in generating " + exportType + " report.");
            } else {
                httpHeaders.setContentDispositionFormData(Constants.FILE, outputFile.getName());
            }
            report = new ReportFileType();
            report.setHttpHeader(httpHeaders);
            report.setReportFile(outputFile);
            return report;
        } catch (IOException | CustomException e) {
            throw new RuntimeException("Error while generating report file.", e);
        }
    }

}
