import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='grid flex-1 place-content-center text-center my-10'>
      <h1 className='mb-4 text-2xl font-bold'>Not Found</h1>
      <p className='mb-8 text-lg'>찾을 수 없는 페이지입니다.</p>
      <Link
        href='/products'
        className='inline-block px-6 py-3 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-400 transition duration-300 '
      >
        Products
      </Link>
    </div>
  );
};

export default NotFound;
