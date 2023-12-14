// import React, { useState } from "react";
// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// function App() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [downloadLink, setDownloadLink] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//     setDownloadLink(null);
//   };

//   const modifyPDF = async () => {
//     try {
//       if (!selectedFile) {
//         alert("Please select a PDF file.");
//         return;
//       }

//       const pdfBytes = await readFileAsync(selectedFile);
//       const pdfDoc = await PDFDocument.load(pdfBytes);

//       // Log the loaded PDF document
//       console.log("Loaded PDF Document:", pdfDoc);

//       // Modify form fields (replace 'YourFieldName' and 'New Data' with actual values)
//       const textField = pdfDoc.getForm().getTextField("Patient Name");
//       if (textField) {
//         textField.setText("Mr. John Doe");
//       } else {
//         console.error("Field not found");
//         return;
//       }

//       const form = pdfDoc.getForm();
//       const fields = form.getFields();
//       console.log("Form Fields:", fields);

//       const fieldNames = fields.map((field) => field.getName());
//       console.log("Field Names:", fieldNames);

//       fields.forEach((field) => {
//         console.log(
//           `Field Name: ${field.getName()}, Type: ${field.constructor.name}`
//         );
//       });

//       console.log("Loaded PDF Document:", pdfDoc);

//       const modifiedPdfBytes = await pdfDoc.save();
//       // const modifiedPdfBytes = pdfDoc;

//       // Create a Blob from the modified PDF data
//       const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
//         type: "application/pdf",
//       });

//       // Create a download link
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(modifiedPdfBlob);
//       link.download = "modified_form.pdf";

//       // Trigger a click on the link to start the download
//       link.click();

//       // Clean up
//       URL.revokeObjectURL(link.href);
//       setDownloadLink(link);
//     } catch (error) {
//       console.error("Error processing PDF:", error);
//     }
//   };

//   const readFileAsync = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(new Uint8Array(reader.result));
//       reader.onerror = reject;
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} accept=".pdf" />
//       <button onClick={modifyPDF}>Fill PDF Form</button>
//       {downloadLink && (
//         <p>
//           <a href={downloadLink.href} download={downloadLink.download}>
//             Download Modified PDF
//           </a>
//         </p>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

const PdfForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filledPdfBytes, setFilledPdfBytes] = useState(null);

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(new Uint8Array(reader.result));
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFillData = async () => {
    try {
      if (!selectedFile) {
        alert("Please select a PDF file.");
        return;
      }

      const pdfBytes = await readFileAsync(selectedFile);
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Log available field names
      const form = pdfDoc.getForm();
      const fieldNames = form.getFields().map((field) => field.getName());
      console.log("Available Fields:", fieldNames);

      // Create a new PDF document
      const filledPdfDoc = await PDFDocument.create();

      // Copy pages from the original document to the new document
      const pages = await filledPdfDoc.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      pages.forEach((page) => filledPdfDoc.addPage(page));

      // Modify form fields in the new document
      const textField = filledPdfDoc.getForm().getTextField("Fax Number");
      if (textField) {
        textField.setText("New Fax Data");
      } else {
        console.error("Field not found");
        return;
      }

      // Save the modified PDF
      const modifiedPdfBytes = await filledPdfDoc.save();

      // Set the modified PDF bytes for download
      setFilledPdfBytes(modifiedPdfBytes);
    } catch (error) {
      console.error("Error loading or processing the PDF:", error);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
      <button onClick={handleFillData}>Fill Data</button>

      {filledPdfBytes && (
        <div>
          <p>Download the filled PDF:</p>
          <a
            href={`data:application/pdf;base64,${btoa(
              String.fromCharCode.apply(null, filledPdfBytes)
            )}`}
            download="filled_form.pdf"
          >
            Download Filled PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default PdfForm;
