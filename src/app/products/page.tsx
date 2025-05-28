'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '../lib/api';
import ProductGrid from './components/ProductGrid';
import ProductList from './components/ProductList';
import { Product } from '../types/product';
import Link from 'next/link';
import Button from '../ui/button';

type ViewType = 'grid' | 'list';

const VIEW_KEY = 'viewType';
const TTL_KEY = 'viewTypeTTL'; // TTL in ISO string format

export default function ProductsPage() {
  const [viewType, setViewType] = useState<ViewType | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const now = new Date();
    const savedView = localStorage.getItem(VIEW_KEY);
    const ttl = localStorage.getItem(TTL_KEY);

    const isExpired = ttl ? new Date(ttl) < now : true;

    if (!savedView || isExpired) {
      const newView: ViewType = Math.random() < 0.5 ? 'grid' : 'list';
      const newTTL = new Date();
      newTTL.setHours(newTTL.getHours() + 24);

      localStorage.setItem(VIEW_KEY, newView);
      localStorage.setItem(TTL_KEY, newTTL.toISOString());

      setViewType(newView);
    } else {
      setViewType(savedView as ViewType);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(20);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  if (!viewType || products.length === 0) return <p>Loading...</p>;

  return (
    <main>
      <Button variant='primary'>
        <Link href='/products/new'>Add Product</Link>
      </Button>
      {viewType === 'grid' ? (
        <ProductGrid products={products} />
      ) : (
        <ProductList products={products} />
      )}
    </main>
  );
}
