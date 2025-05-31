import { Product } from '@/app/types/product';
import ProductCard from './ProductCard';

export default function ProductListView({ products }: { products: Product[] }) {
  return (
    <section className='flex flex-col gap-2'>
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}
