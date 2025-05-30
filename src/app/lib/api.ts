import {
  AddProductRequestBody,
  Product,
  ProductsParams,
} from '../types/product';

export const getProducts = async ({ limit }: ProductsParams = {}): Promise<
  Product[]
> => {
  const query = limit ? `?limit=${limit}` : '';
  const res = await fetch(`https://dummyjson.com/products${query}`);
  const data = await res.json();
  return data.products;
};

export const addProduct = async (product: AddProductRequestBody) => {
  try {
    const res = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      console.error(`❗ 요청 실패: ${res.status} ${res.statusText}`);
      return res.status;
    }

    return res.status;
  } catch (error) {
    console.error('❗ 네트워크 오류 또는 JSON 직렬화 오류:', error);
    return 0;
  }
};
