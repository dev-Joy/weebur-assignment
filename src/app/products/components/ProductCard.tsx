import Star from '@/app/icon/star';
import { Product } from '@/app/types/product';
import Image from 'next/image';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className='w-full p-2'>
      <section className='group h-full rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-zinc-100 overflow-hidden cursor-pointer'>
        <div className='relative w-full aspect-[4/3] bg-zinc-50'>
          <Image
            src={product.thumbnail}
            alt={`Thumbnail for ${product.title}`}
            fill
            className='object-contain p-4 transition-transform duration-300 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw'
          />
        </div>
        <div className='p-4 flex flex-col gap-2'>
          <h2 className='text-base md:text-sm lg:text-base font-extrabold text-zinc-800 leading-snug line-clamp-2'>
            {product.title}
          </h2>
          <div className='flex items-center gap-1 text-sm text-zinc-700'>
            <Star />
            <span className='font-medium'>{product.rating}</span>
            <span className='text-zinc-400 ml-1'>
              리뷰 {product.reviews.length}
            </span>
          </div>
          <p className='text-sm md:text-xs lg:text-sm text-zinc-500 mt-1 line-clamp-2 md:line-clamp-2 lg:line-clamp-3'>
            {product.description}
          </p>
        </div>
      </section>
    </article>
  );
}
