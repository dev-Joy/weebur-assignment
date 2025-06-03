import React from 'react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import ProductForm from '@/app/products/components/ProductForm';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

vi.mock('@/app/lib/api', () => ({
  addProduct: vi.fn(() => Promise.resolve()),
}));

describe('ProductForm 유효성 검사', () => {
  beforeEach(() => {
    render(<ProductForm />);
  });

  afterEach(() => {
    cleanup();
  });

  it('필수 입력란이 비었으면 에러 메시지 출력', async () => {
    fireEvent.click(screen.getByRole('button', { name: /상품 생성/i }));

    await waitFor(() => {
      expect(screen.getByText(/상품명은 필수 항목입니다./)).toBeInTheDocument();
      expect(screen.getByText(/가격은 필수 항목입니다./)).toBeInTheDocument();
      expect(screen.getByText(/브랜드 선택은 필수입니다./)).toBeInTheDocument();
    });
  });

  it('상품명 최대 15자 제한', async () => {
    const input = screen.getByLabelText(/상품명/);

    fireEvent.change(input, { target: { value: 'a'.repeat(16) } });
    fireEvent.click(screen.getByRole('button', { name: /상품 생성/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/15자 이내로 입력해 주세요./)
      ).toBeInTheDocument();
    });
  });

  it('가격은 1000원 이상', async () => {
    const priceInput = screen.getByLabelText(/가격/);

    fireEvent.change(priceInput, { target: { value: '999' } });
    fireEvent.click(screen.getByRole('button', { name: /상품 생성/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/1000원 이상으로 입력해야 합니다./)
      ).toBeInTheDocument();
    });
  });

  it('할인율은 100이내로 입력', async () => {
    const discountInput = screen.getByLabelText(/할인율/);

    fireEvent.change(discountInput, { target: { value: '100' } });
    fireEvent.click(screen.getByRole('button', { name: /상품 생성/i }));

    // handleDiscountChange
    expect(discountInput).toHaveValue('99');
  });

  it('finalPrice가 있을 때, 가격을 올바르게 표시한다', async () => {
    const priceInput = screen.getByLabelText(/가격/);
    const discountInput = screen.getByLabelText(/할인율/);

    fireEvent.change(priceInput, { target: { value: '10000' } });
    fireEvent.change(discountInput, { target: { value: '10' } });

    await waitFor(() => {
      expect(screen.getByText('최종 가격:9,000원')).toBeInTheDocument();
    });
  });

  it('finalPrice가 없을 때, 계산 중... 문구를 표시한다', () => {
    expect(screen.getByText(/계산 중.../)).toBeTruthy();
  });

  it('올바른 값 입력 시 제출 성공 및 addProduct 호출', async () => {
    const addProduct = (await import('@/app/lib/api')).addProduct as jest.Mock;

    fireEvent.change(screen.getByLabelText(/상품명/), {
      target: { value: '테스트 상품' },
    });
    fireEvent.change(screen.getByLabelText(/가격/), {
      target: { value: '1000' },
    });
    fireEvent.change(screen.getByLabelText(/브랜드/), {
      target: { value: 'Weebur' },
    });
    fireEvent.change(screen.getByLabelText(/할인율/), {
      target: { value: '10' },
    });

    fireEvent.click(screen.getByRole('button', { name: /상품 생성/i }));

    await waitFor(() => {
      expect(addProduct).toHaveBeenCalledWith(
        expect.objectContaining({
          title: '테스트 상품',
          price: 1000,
          brand: 'Weebur',
          discountPercentage: 10,
        })
      );
    });
  });
});
