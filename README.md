### 시스템 요구사항

- Node 20 LTS 이상
- pnpm 10.2.1 이상

## 실행 방법

```bash
pnpm i
pnpm dev
```

## 구현 페이지

app/
├── products/
│ ├── page.tsx # 상품 리스트
│ ├── new/page.tsx # 상품 생성 폼
│ └── components/
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   └── ProductForm.tsx
├── lib/
│ └── api.ts # fetch 유틸
│ └── registry.tsx # style components
├── types/
│ └── product.ts # 타입 정의
├── ui/
│ └── product.ts

## 1. 상품 리스트 페이지 (`/products`)

## 2. 상품 생성 페이지 (`/products/new`)

가장 널리 사용되는 React 폼 라이브러리. zod과 함께 사용하여 강력한 폼 검증 가능

- [React Hook Form](https://www.react-hook-form.com/)
- [zod](https://zod.dev/)

## 스타일

- [Styled Components](https://styled-components.com/)
- [How to NextJS Styled Components](https://nextjs.org/docs/app/guides/css-in-js#styled-components)
