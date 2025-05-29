# text-form-pdf

Cloudflare Workers에서 PDF 파일의 텍스트를 추출하는 API입니다.

## 배포 및 실행 방법

1. 의존성 설치

```sh
pnpm install
```

2. 개발 서버 실행 (로컬)

```sh
pnpm dev
```

3. Cloudflare에 배포

```sh
pnpm deploy
```

## 사용법

HTTP GET 요청으로 PDF URL을 쿼리 파라미터로 전달하면 텍스트를 추출해 반환합니다.

```
GET /?url=PDF_URL
```

### 예시

```sh
curl 'https://<YOUR_WORKER_URL>/?url=https://example.com/sample.pdf'
```

- url 파라미터가 없으면 400 에러를 반환합니다.
- 반환값은 PDF의 텍스트(최대 1000자, UTF-8)입니다.
