// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import pdfjs from "pdfjs-dist"; // Add this line
// import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
// import "pdfjs-dist/web/pdf_viewer.css"; // Add this line for styles

// GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// // ... rest of your code ...

// const PdfToExcelConverter = () => {
//   const [pdfFile, setPdfFile] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setPdfFile(file);
//   };

//   const convertToExcel = async () => {
//     try {
//       if (!pdfFile) {
//         alert("Please upload a PDF file first.");
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = async () => {
//         const data = new Uint8Array(reader.result);

//         // Ensure GlobalWorkerOptions.workerSrc is set before calling getDocument
//         const loadingTask = getDocument({ data });

//         const pdfDoc = await loadingTask.promise;
//         const excelData = [];

//         for (let i = 1; i <= pdfDoc.numPages; i++) {
//           const page = await pdfDoc.getPage(i);
//           const textContent = await page.getTextContent();
//           const text = textContent.items.map((item) => item.str).join(" ");
//           excelData.push([text]);
//         }

//         if (excelData.length === 0) {
//           throw new Error("No text found in the PDF.");
//         }

//         const workbook = XLSX.utils.book_new();
//         const worksheet = XLSX.utils.json_to_sheet(excelData);
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

//         // Create blob and initiate download
//         const blob = XLSX.write(workbook, {
//           bookType: "xlsx",
//           mimeType:
//             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         });
//         const blobURL = URL.createObjectURL(
//           new Blob([blob], {
//             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//           })
//         );
//         const a = document.createElement("a");
//         a.href = blobURL;
//         a.download = "converted_data.xlsx";
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//       };

//       reader.readAsArrayBuffer(pdfFile);
//     } catch (error) {
//       console.error("Error converting PDF to Excel:", error);
//       alert(`Error converting PDF to Excel: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h1>PDF to Excel Converter</h1>
//       <input type="file" accept=".pdf" onChange={handleFileChange} />
//       <button onClick={convertToExcel}>Convert to Excel</button>
//     </div>
//   );
// };

// export default PdfToExcelConverter;
