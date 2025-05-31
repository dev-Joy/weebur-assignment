import { Product } from '@/app/types/product';
import ProductCard from './ProductCard';

export default function ProductGridView({ products }: { products: Product[] }) {
  return (
    <section className='grid grid-cols-4 gap-2'>
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}
