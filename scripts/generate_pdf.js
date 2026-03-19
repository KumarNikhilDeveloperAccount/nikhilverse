const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function generate() {
    try {
        const pdfDoc = await PDFDocument.create();
        const imgs = [
           "C:\\Users\\nkash\\.gemini\\antigravity\\brain\\67281fea-c53c-451c-9673-896848aadd6b\\media__1773910480259.png",
           "C:\\Users\\nkash\\.gemini\\antigravity\\brain\\67281fea-c53c-451c-9673-896848aadd6b\\media__1773910486106.png"
        ];
        
        for (const imgPath of imgs) {
            const imgBytes = fs.readFileSync(imgPath);
            const image = await pdfDoc.embedPng(imgBytes);
            const { width, height } = image.scale(1);
            // Create a page with the exact dimensions of the image
            const page = pdfDoc.addPage([width, height]);
            page.drawImage(image, { x: 0, y: 0, width, height });
        }
        
        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync("public/Kumar_Nikhil_Resume.pdf", pdfBytes);
        console.log("PDF strictly generated at public/Kumar_Nikhil_Resume.pdf");
    } catch (e) {
        console.error(e);
    }
}

generate();
