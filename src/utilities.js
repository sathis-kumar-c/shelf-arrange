import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

// PX to CM
export function pxToCm(px) {
  const ppi = 96; // Assuming a common PPI
  const cmPerInch = 2.54;
  const cm = (px / ppi) * cmPerInch;
  return cm;
}

// CM to PX
export function cmToPx(cm) {
  const ppi = 96; // Assuming a common PPI
  const inchPerCm = 1 / 2.54;
  const px = cm * ppi * inchPerCm;
  return px;
}

//calculate percentage to pixles
export function calculatePercentageInPixels(pxValue, percentage) {
  if (parseInt(percentage) <= 100) {
    return `${(parseInt(pxValue) * parseInt(percentage)) / 100}px`;
  }
}

//calculate percentage
export function calculatePercentage(part, whole) {
  if (whole === 0) {
    return 0; // Avoid division by zero
  }
  return (part / parseInt(whole)) * 100;
}

//shelf to conver to the pdf
export const handleConvertToPDF = (querySel, fileName) => {
  const element = document.querySelector(`.${querySel}`);

  if (element) {
    html2canvas(element, { scrollX: 0, scrollY: -window.scrollY }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "px", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${fileName}.pdf`);
      }
    );
  } else {
    console.error("Element not found");
  }
};

//json export
export const handleExport = (data) => {
  // Convert the object to JSON
  const json = JSON.stringify(data, null, 2); // The second argument (null, 2) adds formatting for readability

  // Create a Blob with the JSON data
  const blob = new Blob([json], { type: "application/json" });

  // Save the file using FileSaver.js
  saveAs(blob, "planogram.json");
};

// X and Y position (onClick)
export const checkPosition = (event) => {
  const rowParent = event.currentTarget;
  const rect = rowParent.getBoundingClientRect();
  const x = event.clientX - rect.left; // X position relative to the rowParent
  const y = event.clientY - rect.top; // Y position relative to the rowParent
  console.log(`Clicked at (${x}, ${y}) within the rowParent.`);
};
