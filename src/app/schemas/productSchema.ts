import { z } from 'zod';
import { Brand, BRANDS } from '../types/product';

const BRANDS_TUPLE = BRANDS as [Brand, ...Brand[]];

export const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, '상품명은 필수 항목입니다.')
    .max(15, '15자 이내로 입력해 주세요.'),
  description: z.string().optional(),
  price: z.coerce
    .number({
      invalid_type_error: '숫자를 입력해 주세요.',
      required_error: '가격은 필수 항목입니다.',
    })
    .gte(1000, '1000원 이상으로 입력해야 합니다.'),
  discountPercentage: z.coerce
    .number({
      invalid_type_error: '숫자를 입력해 주세요.',
    })
    .gte(0, '0 이상 큰 숫자를 입력해주세요.')
    .lt(100, '100이내로 입력해야 합니다.')
    .optional(),
  brand: z.enum(BRANDS_TUPLE, {
    message: '브랜드 선택은 필수입니다.',
  }),
});

export type ProductType = z.infer<typeof productSchema>;
