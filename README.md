### 시스템 요구사항

- Node 20 LTS 이상
- pnpm 10.2.1 이상

## 실행 방법

```bash
pnpm i
pnpm dev
```

### 폴더 구조 (App Router)

```
app/
├── products/
│ ├── page.tsx
│ ├── new/
│   └── page.tsx
│ └── components/
│   ├── ProductCard.tsx
│   └── ProductForm.tsx
│   ├── ProductGrid.tsx
│   ├── ProductList.tsx
├── lib/
│ └── api.ts
│ └── registry.tsx
├── types/
│ └── product.ts # 타입 정의
├── ui/
│ └── button.tsx
```

## 구현 페이지

### 1. 상품 리스트 페이지

`/products`

### 2. 상품 생성 페이지

`/products/new`

- [React Hook Form](https://www.react-hook-form.com/)
- [zod](https://zod.dev/)

## 스타일링

- [Tailwindcss](https://tailwindcss.com/)
- [Styled Components](https://styled-components.com/)
- [How to NextJS Styled Components](https://nextjs.org/docs/app/guides/css-in-js#styled-components)
