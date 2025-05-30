export interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: string;
  reviews: string;
}

export interface ProductsParams {
  limit?: number;
}

export type Brand = 'Apple' | 'Samsung' | 'Weebur';
export const BRANDS: Brand[] = ['Apple', 'Samsung', 'Weebur'];

export interface AddProductRequestBody {
  title: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  brand: Brand;
}
