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

  // Calculate scale factor for the desired dimension (width or height)
  let scale = 1;
  let targetWidth = nwh.width;
  let targetHeight = nwh.height;
  size = size * 10;
  if (desiredDimension === "w") {
    scale = size / (nwh.width / 37.7952755906); // px to mm (1mm ≈ 3.78px)
    targetWidth = size;
    targetHeight = (nwh.height / nwh.width) * size;
  } else if (desiredDimension === "h") {
    scale = size / (nwh.height / 37.7952755906);
    targetHeight = size;
    targetWidth = (nwh.width / nwh.height) * size;
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