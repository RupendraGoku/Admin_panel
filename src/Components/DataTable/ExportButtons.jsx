// src/Components/DataTable/ExportButtons.jsx
import React from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ExportButtons = ({ data = [], columns = [], fileName = "data" }) => {
  const handleCopy = () => {
    const headerRow = columns.join("\t");
    const dataRows = data.map((row) => columns.map((col) => row[col]).join("\t"));
    const text = [headerRow, ...dataRows].join("\n");
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleCSV = () => {
    const csvData = data.map((row) =>
      columns.reduce((acc, key) => {
        acc[key] = row[key];
        return acc;
      }, {})
    );
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${fileName}.csv`);
  };

  const handleExcel = () => {
    const excelData = data.map((row) =>
      columns.map((key) => row[key]).join("\t")
    );
    const header = columns.join("\t");
    const content = [header, ...excelData].join("\n");
    const blob = new Blob([content], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });
    saveAs(blob, `${fileName}.xls`);
  };

  const handlePDF = async () => {
    const table = document.querySelector(".datatable-table");
    if (!table) return;

    const canvas = await html2canvas(table);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 10, pageWidth, imgHeight);
    pdf.save(`${fileName}.pdf`);
  };

  const handlePrint = () => {
    const table = document.querySelector(".datatable-table");
    const newWin = window.open("", "_blank");
    newWin.document.write("<html><head><title>Print</title></head><body>");
    newWin.document.write(table.outerHTML);
    newWin.document.write("</body></html>");
    newWin.document.close();
    newWin.print();
  };

  return (
    <div className="export-buttons">
      <button onClick={handleCopy}>Copy</button>
      <button onClick={handleCSV}>CSV</button>
      <button onClick={handleExcel}>Excel</button> {/* ✅ Added */}
      <button onClick={handlePDF}>PDF</button>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default ExportButtons;
