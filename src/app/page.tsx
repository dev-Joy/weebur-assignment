import Link from 'next/link';
import { getProducts } from './lib/api';
import Carousel from './components/Carousel';

export default async function Home() {
  const productList = await getProducts({ limit: 20 });

  return (
    <main className='flex flex-col items-center px-6 md:px-12 lg:px-20 py-16 gap-8 bg-gradient-to-b from-white to-gray-100 min-h-screen'>
      <div className='text-center space-y-4'>
        <h1 className='text-4xl md:text-5xl font-extrabold text-zinc-900 drop-shadow-md tracking-tight'>
          PRODUCTS
        </h1>
      </div>
      <Link
        href='/products'
        className='
          inline-block
          px-10 py-4
          rounded-full
          bg-gradient-to-r from-sky-500 to-blue-500
          text-white
          font-bold
          text-lg
          shadow-lg
          hover:scale-105
          hover:shadow-xl
          transition
          duration-300
          ease-in-out
        '
      >
        View
      </Link>
      <div className='w-full max-w-6xl shadow-xl rounded-2xl overflow-hidden border border-zinc-200 bg-white'>
        <Carousel productList={productList} />
      </div>
    </main>
  );
}
