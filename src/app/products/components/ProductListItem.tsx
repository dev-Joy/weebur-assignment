import Star from '@/app/icon/star';
import { Product } from '@/app/types/product';
import Image from 'next/image';

export default function ProductListItem({ product }: { product: Product }) {
  return (
    <article className='w-full p-2'>
      <section className='group flex gap-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-zinc-100 overflow-hidden cursor-pointer'>
        <div className='relative w-36 h-28 bg-zinc-50 flex-shrink-0'>
          <Image
            src={product.thumbnail}
            alt={`Thumbnail for ${product.title}`}
            fill
            className='object-contain p-3 transition-transform duration-300 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, 200px'
          />
        </div>
        <div className='flex flex-col justify-between py-3 pr-4 w-full'>
          <h2 className='text-sm font-extrabold text-zinc-800 leading-snug line-clamp-2'>
            {product.title}
          </h2>
          <div className='flex items-center gap-1 text-sm text-zinc-700 mt-1'>
            <Star />
            <span className='font-medium'>{product.rating}</span>
            <span className='text-zinc-400 ml-2'>
              리뷰 {product.reviews.length}
            </span>
          </div>
          <p className='text-sm text-zinc-500 mt-1 line-clamp-2'>
            {product.description}
          </p>
        </div>
      </section>
    </article>
  );
}
