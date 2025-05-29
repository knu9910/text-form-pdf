import * as pdfjsLib from "pdfjs-dist/build/pdf.js";
import type {
  PDFDocumentProxy,
  PDFPageProxy,
  TextContent,
  TextItem,
} from "pdfjs-dist/types/src/display/api";

// pdfjs-dist는 Web Worker 환경용 설정이 필요할 수 있는데, 클라우드플레어 Workers는 별도 Worker 설정 없이 사용 가능합니다.

export default {
  async fetch(request: Request): Promise<Response> {
    // 쿼리 파라미터에서 url 추출
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    if (!url) {
      return new Response("url 파라미터가 필요합니다", { status: 400 });
    }

    try {
      // PDF 파일 fetch → ArrayBuffer 얻기
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch PDF: ${res.status}`);

      const arrayBuffer = await res.arrayBuffer();

      // PDF 데이터 로드
      const pdf: PDFDocumentProxy = await (pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise as Promise<PDFDocumentProxy>);

      let fullText = "";

      // 모든 페이지 텍스트 추출
      for (let i = 1; i <= pdf.numPages; i++) {
        const page: PDFPageProxy = await pdf.getPage(i);
        const content: TextContent = await page.getTextContent();

        // TextItem만 str 추출 (TextMarkedContent는 무시)
        const strings = content.items
          .filter((item): item is TextItem => "str" in item)
          .map((item) => item.str);
        fullText += strings.join(" ") + "\n\n";
      }

      // 결과 반환 (첫 1000자만 예시)
      return new Response(fullText.slice(0, 1000), {
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
      });
    } catch (e: unknown) {
      // 에러 타입 단언
      const errorMsg = e instanceof Error ? e.message : String(e);
      return new Response(`Error: ${errorMsg}`, { status: 500 });
    }
  },
};
