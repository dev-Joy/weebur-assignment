import { z } from 'zod';

export const productSchema = z.object({
  title: z
    .string()
    .min(1, '필수 항목입니다.')
    .max(15, '15자 이내로 입력해 주세요.'),
  description: z.string().optional(),
  price: z.number().min(1000, '1000원 이상이어야 합니다.'),
  discountPercentage: z
    .number()
    .max(100, '100 이하로 입력해 주세요.')
    .optional(),
  brand: z.enum(['Apple', 'Samsung', 'Weebur'], {
    errorMap: () => ({ message: '브랜드를 선택해 주세요.' }),
  }),
});

export type AddProductRequestBody = z.infer<typeof productSchema>;
