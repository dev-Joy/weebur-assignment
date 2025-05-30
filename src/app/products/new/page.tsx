import { Metadata } from 'next';
import ProductForm from '../components/ProductForm';

export const metadata: Metadata = {
  title: 'Add Product',
  description: '상품을 생성합니다.',
};

export default function AddProductPage() {
  return (
    <main className='flex flex-col items-center'>
      <h1 className='text-2xl font-bold text-blue-800 my-5'>상품 추가하기</h1>
      <ProductForm />
    </main>
  );
}
