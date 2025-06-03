import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import {
  FormGroup,
  FormLabel,
  FormSelect,
  ErrorText,
  FormRequired,
} from '@/app/ui/form';

interface Props {
  label: string;
  required?: boolean;
  options: string[];
  register: UseFormRegisterReturn;
  error?: string;
}

export default function Select({
  label,
  required,
  options,
  register,
  error,
}: Props) {
  return (
    <FormGroup>
      <FormLabel htmlFor={register.name}>
        {label} {required && <FormRequired>[필수]</FormRequired>}
      </FormLabel>
      <FormSelect
        {...register}
        id={register.name}
        $hasError={!!error}
      >
        <option value=''>선택하세요</option>
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
          >
            {opt}
          </option>
        ))}
      </FormSelect>
      {error && <ErrorText>{error}</ErrorText>}
    </FormGroup>
  );
}
