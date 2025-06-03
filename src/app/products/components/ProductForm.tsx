'use client';

import React, { useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Button from '@/app/ui/button';
import { addProduct } from '@/app/lib/api';
import { AddProductRequestBody, BRANDS } from '@/app/types/product';
import { productSchema, ProductType } from '@/app/schemas/productSchema';
import { Form, PriceInfo, FormGrid } from '@/app/ui/form';
import Select from '@/app/components/forms/Select';
import TextArea from '@/app/components/forms/TextArea';
import Input from '@/app/components/forms/Input';

export default function ProductForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    shouldFocusError: false,
  });

  const title = useWatch({ control, name: 'title' });
  const price = useWatch({ control, name: 'price' });
  const discountPercentage = useWatch({ control, name: 'discountPercentage' });
  const description = useWatch({ control, name: 'description' });

  const finalPrice = useMemo(() => {
    if (typeof price !== 'number' || price <= 0) return 0;
    const discount =
      typeof discountPercentage === 'number'
        ? discountPercentage
        : Number(String(discountPercentage) || '0');
    return Math.round(price * (1 - discount / 100));
  }, [price, discountPercentage]);

  const onSubmit = async (data: ProductType) => {
    try {
      await addProduct(data as AddProductRequestBody);
      router.push('/products');
    } catch (err) {
      console.error('상품 생성 오류:', err);
      alert('상품 생성 중 문제가 발생했습니다.');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='상품명'
        required
        type='text'
        maxLength={15}
        value={title}
        register={register('title')}
        setValue={setValue}
        error={errors.title?.message}
      />

      <TextArea
        label='설명'
        placeholder='상품에 대한 설명입니다.'
        value={description}
        register={register('description')}
      />

      <FormGrid>
        <Controller
          name='price'
          control={control}
          render={({ field }) => (
            <Input
              id='price'
              label='가격'
              required
              type='number'
              placeholder='1,000'
              unit='₩'
              value={field.value}
              onChange={field.onChange}
              setValue={setValue}
              error={errors.price?.message}
            />
          )}
        />

        <Controller
          name='discountPercentage'
          control={control}
          render={({ field }) => (
            <Input
              id='discountPercentage'
              label='할인율'
              type='number'
              placeholder='0'
              unit='%'
              value={field.value}
              onChange={field.onChange}
              maxNum={99}
            />
          )}
        />
      </FormGrid>

      <PriceInfo>
        최종 가격:
        {finalPrice ? `${finalPrice.toLocaleString()}원` : '계산 중...'}
      </PriceInfo>

      <Select
        label='브랜드'
        required
        options={BRANDS}
        register={register('brand')}
        error={errors.brand?.message}
      />

      <Button
        type='submit'
        variant='primary'
      >
        상품 생성
      </Button>
    </Form>
  );
}
