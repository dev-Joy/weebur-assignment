# WEEBUR 프론트엔드 코딩 과제

프론트엔드 개발자의 문제 해결 능력, 컴포넌트 설계 능력, 코드 품질, UI 구현, 사용자 경험 등의 역량을 종합적으로 확인하기 위한 과제입니다.

**구현기간**: 2025.05.28 ~ 2025.06.02

## 개발 설계 방향

| 항목                                  | 선택 이유                                                   |
| ------------------------------------- | ----------------------------------------------------------- |
| **App Router 기반 폴더 구조**         | 기능별 분리와 명확한 라우팅 관리를 위해                     |
| **React Hook Form + Zod**             | 폼 검증과 UI 분리를 동시에 고려한 효율적인 선택             |
| **Tailwind + Styled Components 병행** | 유틸 기반의 빠른 스타일링과 컴포넌트 단위 커스터마이징 병행 |
| **Middleware에서 cookie 제어**        | View 모드 유지 문제 해결 및 사용자 경험 향상                |
| **Vitest + RTL**                      | QA 시간 단축 및 주요 로직 단위 테스트 가능                  |

### 기술 스택

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/docs/app)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **패키지 매니저** : [pnpm](https://pnpm.io/ko/)
- **Form 관리**: [React Hook Form](https://react-hook-form.com/)
- **유효성 검사**: [zod](https://zod.dev/)
- **스타일링**: [Tailwind CSS](https://tailwindcss.com/), [Styled Components](https://styled-components.com/)

### 시스템 요구사항

- Node 20 LTS 이상
- pnpm 10 이상

## 실행 방법

```bash
# 1. 설치
pnpm install

# 2. local 실행
pnpm dev

# 3. 접속
https://localhost:3000/products
```

### 폴더 구조 (App Router)

```
   ├─ src
   │  ├─ app
   │  │  ├─ components
   │  │  │  ├─ Carousel.tsx
   │  │  │  └─ forms
   │  │  │     ├─ Input.tsx
   │  │  │     ├─ Select.tsx
   │  │  │     └─ TextArea.tsx
   │  │  ├─ favicon.ico
   │  │  ├─ globals.css
   │  │  ├─ icon
   │  │  │  ├─ clear.tsx
   │  │  │  └─ star.tsx
   │  │  ├─ layout.tsx
   │  │  ├─ lib
   │  │  │  ├─ api.ts
   │  │  │  └─ registry.tsx
   │  │  ├─ not-found.tsx
   │  │  ├─ page.tsx
   │  │  ├─ products
   │  │  │  ├─ components
   │  │  │  │  ├─ ProductCard.tsx
   │  │  │  │  ├─ ProductForm.tsx
   │  │  │  │  ├─ ProductGridView.tsx
   │  │  │  │  ├─ ProductListItem.tsx
   │  │  │  │  └─ ProductListView.tsx
   │  │  │  ├─ new
   │  │  │  │  └─ page.tsx
   │  │  │  └─ page.tsx
   │  │  ├─ schemas
   │  │  │  └─ productSchema.ts
   │  │  ├─ types
   │  │  │  └─ product.ts
   │  │  └─ ui
   │  │     ├─ button.tsx
   │  │     └─ form.tsx
   │  └─ middleware.ts
   ├─ tsconfig.json
   ├─ vitest.config.ts
   ├─ vitest.setup.ts
   └─ __tests__
      └─ lib
         ├─ api.test.ts
         └─ productForm.test.tsx
```

## 상품 리스트 페이지 (`/products`)

### 기능 설명

- `/products` 페이지에 최초 진입한 사용자에게 50% 확률로 'list' 또는 'grid' 뷰 방식을 랜덤 지정합니다.
- 사용자는 지정된 뷰 방식만을 볼 수 있으며, 이후 24시간 동안 동일한 방식이 유지됩니다.
- 24시간이 지나면 쿠키가 만료되며, 다시 진입 시 새로운 뷰 방식이 랜덤으로 지정됩니다

### 해결 전략

- `Next.js Middleware` 기능을 활용하여 요청(Request) 시점에 뷰 방식을 결정함.
- 사용자의 브라우저 쿠키에 view_type 값을 저장하여, 이미 지정된 사용자는 랜덤 로직을 다시 타지 않도록 방지함.
- 쿠키의 유효기간을 24시간(maxAge: 60 x 60 x 24)으로 설정하여, 하루 동안 같은 UI가 유지되도록 보장함.
- 사용자가 쿠키를 지우거나, 24시간이 경과했을 경우 다시 랜덤 로직이 실행되어 새로운 UI가 지정됨.

참고 문서

- [A/B 테스트 with Next.js & Vercel](https://vercel.com/blog/ab-testing-with-nextjs-and-vercel)
- [NextJS Middleware using cookies](https://nextjs.org/docs/app/building-your-application/routing/middleware#using-cookies)

## 상품 생성 페이지 (`/products/new`)

### 사용 기술

- `React Hook Form` + `Zod`
  - `zodResolver`를 통한 schema 기반 유효성 검사
  - `mode: 'onChange'`를 통해 즉각적 피드백 제공

필드별 유효성:

| 필드명               | 필수 여부 | 유효성 조건                         |
| -------------------- | --------- | ----------------------------------- |
| `title`              | ✅        | 15자 이내                           |
| `description`        | ❌        |                                     |
| `price`              | ✅        | 1,000 이상 입력                     |
| `discountPercentage` | ❌        | 100이내로 입력                      |
| `brand`              | ✅        | Apple, Samsung, Weebur 중 하나 선택 |

2. 실시간으로 최종가격(할인 적용가) 표시

- [useWatch](https://www.react-hook-form.com/api/usewatch/) 및 useMemo로 실시간 반영  
   문제: price와 discountPercentage 입력 시 동적으로 계산된 결과 표시  
   해결:
  handleInputChange(onChange)에서 submit할 데이터의 포맷을, useWatch를 사용해 input value를 변환

3. 값이 잘 넘어가는지 확인
   ![Response](/readme_picture/Response.png)

## 개발 중 고려 사항 및 이슈

- zod v4 안정화되면 [zod/v4 Simplified error customization](https://zod.dev/v4#simplified-error-customization) 참고해서 ProductSchema를 수정해야 함

## 기타

- Form 디자인은 styled components를 사용하였습니다.

참고문서

- [How to NextJS Styled Components](https://nextjs.org/docs/app/guides/css-in-js#styled-components)

## 테스트 코드

- 사용 도구: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- 목적: API 응답, Form 유효성 검증 등 주요 비즈니스 로직에 대한 단위 테스트
- 주요 테스트 파일:
  - `api.test.ts` : API 레이어의 정상 동작 확인
  - `productForm.test.tsx` : 폼 필드 유효성 체크 테스트

```bash
pnpm test                # 전체 테스트
pnpm test api.test.ts    # API 유닛 테스트
pnpm test productForm.test.tsx # Form 유효성 테스트
```
