'use client';

import React from 'react';
import {
  FieldValues,
  Path,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form';
import {
  ErrorText,
  FormGroup,
  FormLabel,
  FormInput,
  UnitWrapper,
  UnitLabel,
  FormTextCount,
  FormRequired,
  FormFooterRow,
  ClearButton,
} from '@/app/ui/form';
import Clear from '@/app/icon/clear';

interface BaseProps<T extends FieldValues> {
  label: string;
  type: 'text' | 'number';
  required?: boolean;
  placeholder?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  setValue?: UseFormSetValue<T>;
}

interface TextInputProps<T extends FieldValues> extends BaseProps<T> {
  type: 'text';
  maxLength?: number;
  value: string;
}

interface NumberInputProps<T extends FieldValues> extends BaseProps<T> {
  type: 'number';
  value: string | number | undefined;
  id: string;
  unit?: string;
  maxNum?: number;
  onChange: (value: string | number) => void;
}

type Props<T extends FieldValues> = TextInputProps<T> | NumberInputProps<T>;

export default function Input<T extends FieldValues>(props: Props<T>) {
  const { label, type, required, placeholder, error, setValue, register } =
    props;

  const id = props?.register?.name ?? ('id' in props ? props.id : undefined);

  const allowOnlyNumberKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumberKey = /^[0-9]$/.test(e.key);
    const allowedKeys = ['ArrowLeft', 'ArrowRight', 'Tab', 'Backspace'];
    if (!isNumberKey && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleNumber = (fieldOnChange: (value: number) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/,/g, '');
      let numeric = Number(raw);

      if (isNaN(numeric)) numeric = 0;
      if (props.type === 'number' && props.maxNum !== undefined) {
        numeric = Math.min(numeric, props.maxNum);
      }
      fieldOnChange(numeric);
    };
  };

  const fieldName = (register?.name ?? id) as Path<T> | undefined;

  const handleClear = () => {
    if (setValue && fieldName) {
      const defaultValue = '' as T[typeof fieldName];

      setValue(fieldName, defaultValue, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (props.type === 'number') {
      props.onChange('');
    }
  };

  const renderNumberInput = () => {
    if (props.type !== 'number') return null;
    const { value, onChange, unit } = props;
    return (
      <>
        <UnitWrapper>
          <FormInput
            {...register}
            id={id}
            $hasError={!!error}
            type='text'
            value={value?.toLocaleString() ?? ''}
            placeholder={placeholder}
            onChange={handleNumber(onChange)}
            onKeyDown={allowOnlyNumberKeys}
          />
          {value !== undefined && value !== null && value !== '' && (
            <ClearButton
              onClick={handleClear}
              $IsNumber={true}
            >
              <Clear />
            </ClearButton>
          )}

          {unit && <UnitLabel>{unit}</UnitLabel>}
        </UnitWrapper>
        {error && <ErrorText>{error}</ErrorText>}
      </>
    );
  };

  const renderTextInput = () => {
    if (props.type !== 'text') return null;
    const { value, placeholder, maxLength } = props;
    return (
      <>
        <FormInput
          {...register}
          id={id}
          $hasError={!!error}
          placeholder={placeholder}
          maxLength={maxLength}
        />
        {value && (
          <ClearButton onClick={handleClear}>
            <Clear />
          </ClearButton>
        )}

        <FormFooterRow $hasError={!!error}>
          {error && <ErrorText>{error}</ErrorText>}
          {maxLength && (
            <FormTextCount>
              {value?.length ?? 0}/{maxLength}
            </FormTextCount>
          )}
        </FormFooterRow>
      </>
    );
  };

  return (
    <FormGroup>
      <FormLabel htmlFor={id}>
        {label} {required && <FormRequired>[필수]</FormRequired>}
      </FormLabel>
      {type === 'number' ? renderNumberInput() : renderTextInput()}
    </FormGroup>
  );
}
