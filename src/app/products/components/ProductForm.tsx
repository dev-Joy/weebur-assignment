'use client';

import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Button from '@/app/ui/button';
import { addProduct } from '@/app/lib/api';
import { AddProductRequestBody } from '@/app/types/product';
import { productSchema } from '@/app/schemas/productSchema';

export default function ProductForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddProductRequestBody>({
    resolver: zodResolver(productSchema),
  });

  const price = watch('price');
  const discountPercentage = watch('discountPercentage');

  const finalPrice = useMemo(() => {
    if (typeof price !== 'number' || !discountPercentage) return price;
    const discount =
      typeof discountPercentage === 'number'
        ? discountPercentage
        : parseFloat(discountPercentage);
    return Math.round(price * (1 - discount / 100));
  }, [price, discountPercentage]);

  const onSubmit = async (data: AddProductRequestBody) => {
    try {
      await addProduct(data);
      router.push('/products');
    } catch (err) {
      console.error('상품 생성 오류:', err);
      alert('상품 생성 중 문제가 발생했습니다.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 max-w-md mx-auto p-4 border rounded-md shadow'
    >
      <div>
        <label className='block font-bold'>상품명 *</label>
        <input
          {...register('title')}
          className='w-full border p-2 rounded'
        />
        {errors.title && (
          <p className='text-red-500 text-sm'>{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className='block font-bold'>설명</label>
        <textarea
          {...register('description')}
          className='w-full border p-2 rounded'
        />
      </div>

      <div>
        <label className='block font-bold'>가격 (₩) *</label>
        <input
          type='number'
          {...register('price', { valueAsNumber: true })}
          className='w-full border p-2 rounded'
        />
        {errors.price && (
          <p className='text-red-500 text-sm'>{errors.price.message}</p>
        )}
      </div>

      <div>
        <label className='block font-bold'>할인율 (%)</label>
        <input
          type='number'
          {...register('discountPercentage', { valueAsNumber: true })}
          className='w-full border p-2 rounded'
        />
        {errors.discountPercentage && (
          <p className='text-red-500 text-sm'>
            {errors.discountPercentage.message}
          </p>
        )}
      </div>

      <div>
        <label className='block font-bold'>브랜드 *</label>
        <select
          {...register('brand')}
          className='w-full border p-2 rounded'
        >
          <option value=''>선택하세요</option>
          <option value='Apple'>Apple</option>
          <option value='Samsung'>Samsung</option>
          <option value='Weebur'>Weebur</option>
        </select>
        {errors.brand && (
          <p className='text-red-500 text-sm'>{errors.brand.message}</p>
        )}
      </div>

      <div className='font-semibold text-blue-600'>
        💰 최종 가격:
        {finalPrice ? `${finalPrice.toLocaleString()}원` : '계산 중...'}
      </div>

      <Button
        type='submit'
        variant='primary'
      >
        상품 생성
      </Button>
    </form>
  );
}
