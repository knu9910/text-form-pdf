import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

const pdfPath = path.resolve(__dirname, "../sample.pdf");

async function extractText(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  try {
    const data = await pdf(buffer);
    console.log("✅ 추출된 텍스트:\n");
    console.log(data.text.slice(0, 1000)); // 처음 1000자만 출력
  } catch (err) {
    console.error("❌ 오류 발생:", err);
  }
}

extractText(pdfPath);
