import { Product } from '@/app/types/product';
import ProductListItem from './ProductListItem';

export default function ProductListView({ products }: { products: Product[] }) {
  return (
    <section className='flex flex-col gap-2'>
      {products.map((product: Product) => (
        <ProductListItem
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}
