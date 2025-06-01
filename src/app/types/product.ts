interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: Review[];
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
