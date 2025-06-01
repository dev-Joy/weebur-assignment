import { addProduct, getProducts } from '@/app/lib/api';
import { AddProductRequestBody, Product } from '@/app/types/product';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('API 함수 테스트', () => {
  const dummyReviews = [
    {
      rating: 4,
      comment: 'Good product',
      date: '2023-01-01',
      reviewerName: 'Alice',
      reviewerEmail: 'alice@example.com',
    },
    {
      rating: 5,
      comment: 'Excellent!',
      date: '2023-01-02',
      reviewerName: 'Bob',
      reviewerEmail: 'bob@example.com',
    },
  ];

  const dummyProducts: Product[] = [
    {
      id: 1,
      title: 'product1',
      description: 'desc1',
      thumbnail: 'url1',
      rating: 4.2,
      reviews: dummyReviews,
    },
    {
      id: 2,
      title: 'product2',
      description: 'desc2',
      thumbnail: 'url2',
      rating: 3.5,
      reviews: dummyReviews,
    },
  ];

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('getProducts가 products 배열을 반환해야 한다', async () => {
    (fetch as unknown as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ products: dummyProducts }),
      ok: true,
      status: 200,
    });

    const products = await getProducts({ limit: 20 });
    expect(fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/products?limit=20'
    );
    expect(products).toEqual(dummyProducts);
  });

  it('addProduct가 올바른 status를 반환해야 한다', async () => {
    const dummyProduct: AddProductRequestBody = {
      title: 'New Product',
      description: 'Nice product',
      price: 1500,
      discountPercentage: 10,
      brand: 'Weebur',
    };

    (fetch as unknown as jest.Mock).mockResolvedValueOnce({
      status: 201,
      ok: true,
    });

    const status = await addProduct(dummyProduct);
    expect(fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/products/add',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dummyProduct),
      })
    );
    expect(status).toBe(201);
  });
});
