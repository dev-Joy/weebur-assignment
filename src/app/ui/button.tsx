import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
}

const StyledButton = styled.button<{
  variant: 'primary' | 'secondary';
  disabled?: boolean;
}>`
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;

  background-color: ${({ variant }) =>
    variant === 'primary' ? 'var(--color-primary)' : 'var(--color-secondary)'};
  color: ${({ variant }) =>
    variant === 'primary'
      ? 'var(--button-text-primary)'
      : 'var(--button-text-secondary)'};

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'primary'
        ? 'var(--button-hover-primary)'
        : '--button-hover-secondary'};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--button-disabled-bg);
    color: var(--button-disabled-text);
  }
`;

export default function Button({
  variant = 'primary',
  disabled = false,
  type = 'button',
  onClick,
  children,
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}
