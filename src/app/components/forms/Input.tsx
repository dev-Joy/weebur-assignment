'use client';

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import {
  ErrorText,
  FormGroup,
  FormLabel,
  FormInput,
  UnitWrapper,
  UnitLabel,
  FormTextCount,
  FormRequired,
} from '@/app/ui/form';

interface BaseProps {
  type: 'text' | 'number';
  label: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  error?: string;
}

interface TextInputProps extends BaseProps {
  type: 'text';
  maxLength?: number;
  value?: string;
}

interface NumberInputProps extends BaseProps {
  type: 'number';
  value: number | undefined;
  id: string;
  unit?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Props = TextInputProps | NumberInputProps;

export default function Input(props: Props) {
  const { label, required, error, register, type } = props;

  const id = register?.name ?? ('id' in props ? props.id : undefined);

  const allowOnlyNumberKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumberKey = /^[0-9]$/.test(e.key);
    const allowedKeys = ['ArrowLeft', 'ArrowRight', 'Tab', 'Backspace'];
    if (!isNumberKey && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const inputElement =
    type === 'number' ? (
      <UnitWrapper>
        <FormInput
          {...register}
          id={id}
          $hasError={!!error}
          type='text'
          value={props.value?.toLocaleString() ?? ''}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onKeyDown={allowOnlyNumberKeys}
        />
        {props.unit && <UnitLabel>{props.unit}</UnitLabel>}
      </UnitWrapper>
    ) : (
      <>
        <FormInput
          {...register}
          id={id}
          $hasError={!!error}
          maxLength={props.maxLength}
        />
        {props.maxLength && (
          <FormTextCount>
            {props.value?.length ?? 0}/{props.maxLength}
          </FormTextCount>
        )}
      </>
    );

  return (
    <FormGroup>
      <FormLabel htmlFor={id}>
        {label} {required && <FormRequired>[필수]</FormRequired>}
      </FormLabel>
      {inputElement}
      {error && <ErrorText>{error}</ErrorText>}
    </FormGroup>
  );
}
