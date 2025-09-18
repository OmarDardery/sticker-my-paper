import jsPDF from "jspdf";

export default async function generateAndDownload(
  desiredDimension: string,
  size: number,
  nwh: { width: number; height: number },
  file: File
) {
  // A4 size in mm
  const A4_WIDTH = 210;
  const A4_HEIGHT = 297;
  console.log(nwh);
  console.log(desiredDimension);
  console.log(size);

  // Convert cm to mm
  const sizeMM = size * 10;

  let targetWidth: number;
  let targetHeight: number;

  if (desiredDimension === "w") {
    targetWidth = sizeMM;
    targetHeight = (nwh.height / nwh.width) * sizeMM;
  } else {
    targetHeight = sizeMM;
    targetWidth = (nwh.width / nwh.height) * sizeMM;
  }

  // Read file as data URL
  const fileDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  // Create PDF
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Center the image on the A4 page
  const x = (A4_WIDTH - targetWidth) / 2;
  const y = (A4_HEIGHT - targetHeight) / 2;

  pdf.addImage(
    fileDataUrl,
    "PNG",
    x,
    y,
    targetWidth,
    targetHeight
  );

  pdf.save("sticker.pdf");
}