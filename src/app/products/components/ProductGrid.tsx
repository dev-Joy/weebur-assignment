import { Product } from '@/app/types/product';
import ProductCard from './ProductCard';
interface Props {
  products: Product[];
}
export default function ProductGrid({ products }: Props) {
  return (
    <section className='grid grid-cols-4'>
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}
