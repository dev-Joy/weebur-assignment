import { Product } from '@/app/types/product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}
export default function ProductList({ products }: Props) {
  return (
    <section className='flex'>
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}
