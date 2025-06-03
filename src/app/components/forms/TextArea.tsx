import React, { useEffect, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import {
  FormGroup,
  FormLabel,
  FormTextArea,
  FormTextCount,
} from '@/app/ui/form';

interface Props {
  label: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  register: UseFormRegisterReturn;
}

export default function TextAreaInput({
  label,
  value,
  placeholder,
  maxLength,
  register,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [value]);

  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <FormTextArea
        {...register}
        ref={(e) => {
          register.ref(e);
          ref.current = e;
        }}
        rows={4}
        placeholder={placeholder}
      />
      {maxLength && (
        <FormTextCount>
          {value?.length ?? 0}/{maxLength}
        </FormTextCount>
      )}
    </FormGroup>
  );
}
