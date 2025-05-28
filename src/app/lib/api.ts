import { AddProductRequestBody, Product } from '../types/product';

export const getProducts = async (limit?: number): Promise<Product[]> => {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}`);
  const data = await res.json();
  return data.products;
};

export const addProduct = async (product: AddProductRequestBody) => {
  const req = await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  const status = req.status;
  return status;
};
