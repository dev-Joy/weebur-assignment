'use client';

import React, { useEffect, useMemo, useRef } from 'react';
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
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  const title = useWatch({ control, name: 'title' });
  const price = useWatch({ control, name: 'price' });
  const discountPercentage = useWatch({ control, name: 'discountPercentage' });
  const description = useWatch({ control, name: 'description' });

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [description]);

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

  const handlePriceChange = (fieldOnChange: (value: number) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/,/g, '');
      const numeric = Number(raw);
      if (!isNaN(numeric)) {
        fieldOnChange(numeric);
      }
    };
  };

  const handleDiscountChange = (fieldOnChange: (value: number) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9]/g, '');
      let numeric = Number(raw);
      if (isNaN(numeric)) {
        numeric = 0;
      }
      numeric = Math.min(numeric, 99);
      fieldOnChange(numeric);
    };
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
        error={errors.title?.message}
      />

      <TextArea
        label='설명'
        value={description}
        register={register('description')}
      />

      <FormGrid>
        <Controller
          name='price'
          control={control}
          render={({ field }) => (
            <Input
              label='가격'
              required
              type='number'
              placeholder='1,000'
              unit='₩'
              value={field.value}
              onChange={handlePriceChange(field.onChange)}
              error={errors.price?.message}
            />
          )}
        />

        <Controller
          name='discountPercentage'
          control={control}
          render={({ field }) => (
            <Input
              label='할인율'
              type='number'
              placeholder='0'
              unit='%'
              value={field.value}
              onChange={handleDiscountChange(field.onChange)}
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
