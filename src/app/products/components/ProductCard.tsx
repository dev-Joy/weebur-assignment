import { Product } from '@/app/types/product';
import Image from 'next/image';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <section className='flex flex-col border-1 m-1 p-3'>
      <Image
        src={product.thumbnail}
        width={300}
        height={300}
        alt={`thumbnail for ${product.title}`}
      />
      <h2 className='text-xl font-bold'>{product.title}</h2>
      <p>{product.description}</p>
      <div>
        <span className='text-sm mr-1'>{product.rating}</span>
        <span className='text-sm text-zinc-400'>
          리뷰 {product.reviews.length}
        </span>
      </div>
    </section>
  );
}
