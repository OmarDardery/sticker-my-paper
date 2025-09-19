import jsPDF from "jspdf";
import { sticker } from "../store/filecontext";

export default async function generateAndDownload(
  stickers: sticker[]
): Promise<boolean> {
  try {
    console.log("Generating PDF with stickers:", stickers);
    // A4 size in mm
    const A4_WIDTH = 210;
    const A4_HEIGHT = 297;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let x = 10; // starting x position
    let y = 10; // starting y position
    const margin = 10;
    let maxRowHeight = 0;

    for (let i = 0; i < stickers.length; i++) {
      const s = stickers[i];
      if (!s.file || !s.nwh.width || !s.nwh.height) continue;

      // Convert size from cm to mm
      const sizeMM = s.size * 10 || 30; // fallback to 30mm if size is 0
      let targetWidth: number;
      let targetHeight: number;

      if (s.desiredDimension === "w") {
        targetWidth = sizeMM;
        targetHeight = (s.nwh.height / s.nwh.width) * sizeMM;
      } else {
        targetHeight = sizeMM;
        targetWidth = (s.nwh.width / s.nwh.height) * sizeMM;
      }

      // Read file as data URL
      const fileDataUrl: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(s.file as File);
      });

      // Repeat for the amount of stickers
      const amount = s.amount && s.amount > 0 ? s.amount : 1;
      for (let count = 0; count < amount; count++) {
        // If sticker doesn't fit horizontally, move to next row
        if (x + targetWidth + margin > A4_WIDTH) {
          x = margin;
          y += maxRowHeight + margin;
          maxRowHeight = 0;
        }

        // If sticker doesn't fit vertically, add a new page
        if (y + targetHeight + margin > A4_HEIGHT) {
          pdf.addPage();
          x = margin;
          y = margin;
          maxRowHeight = 0;
        }

        pdf.addImage(
          fileDataUrl,
          "PNG",
          x,
          y,
          targetWidth,
          targetHeight
        );

        x += targetWidth + margin;
        if (targetHeight > maxRowHeight) maxRowHeight = targetHeight;
      }
    }

    pdf.save("stickers.pdf");
    return true;
  } catch (error) {
    return false;
  }
}