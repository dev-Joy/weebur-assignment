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
    variant === 'primary' ? '#0070f3' : '#e2e8f0'};
  color: ${({ variant }) => (variant === 'primary' ? '#fff' : '#333')};

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'primary' ? '#005bb5' : '#cbd5e1'};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #94a3b8;
    color: #f1f5f9;
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
