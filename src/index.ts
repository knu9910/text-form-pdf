import pdf from "pdf-parse";

// PDF URL에서 fetch → Buffer로 가져와서 처리
async function extractTextFromUrl(url: string) {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const data = await pdf(buffer);
    console.log("✅ 추출된 텍스트:\n");
    console.log(data.text.slice(0, 1000)); // 처음 1000자만 출력
  } catch (err) {
    console.error("❌ 오류 발생:", err);
  }
}

// 예: public 디렉터리나 외부에 있는 PDF
extractTextFromUrl("https://example.com/sample.pdf");
