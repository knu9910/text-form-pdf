// pdfjs-dist 타입 선언 (최소한)
declare module "pdfjs-dist/build/pdf.js" {
  export * from "pdfjs-dist";
  // getDocument 등 주요 함수만 타입 선언 필요시 추가
}

declare module "pdfjs-dist/build/pdf.mjs" {
  export * from "pdfjs-dist";
}

declare module "pdfjs-dist/types/src/display/api" {
  export * from "pdfjs-dist";
}
